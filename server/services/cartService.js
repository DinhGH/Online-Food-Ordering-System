// ============= cartService.js - SIMPLIFIED WITHOUT STOCK =============
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ============= HELPER FUNCTIONS =============

// Helper: Tìm hoặc tạo cart
const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({
    where: { userId: String(userId) },
    select: { id: true },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: String(userId) },
      select: { id: true },
    });
  }

  return cart;
};

// Helper: Kiểm tra món ăn có tồn tại và available không
const checkFoodExists = async (foodId) => {
  const food = await prisma.food.findUnique({
    where: { id: foodId },
    select: {
      id: true,
      name: true,
      isAvailable: true,
    },
  });

  if (!food) {
    throw new Error(`Food item with ID ${foodId} not found`);
  }

  if (!food.isAvailable) {
    throw new Error(`"${food.name}" is currently unavailable`);
  }

  return food;
};

// ============= MAIN FUNCTIONS =============

// ADD TO CART
const addToCart = async (userId, foodId, quantity = 1) => {
  // Chỉ kiểm tra món ăn có tồn tại không
  await checkFoodExists(foodId);

  const cart = await getOrCreateCart(userId);

  const result = await prisma.$transaction(async (tx) => {
    const existingItem = await tx.cartItem.findUnique({
      where: {
        cartId_foodId: {
          cartId: cart.id,
          foodId,
        },
      },
    });

    if (existingItem) {
      // Cộng dồn quantity
      return await tx.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          food: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
              rating: true,
              category: true,
            },
          },
        },
      });
    } else {
      // Tạo mới
      return await tx.cartItem.create({
        data: {
          cartId: cart.id,
          foodId,
          quantity,
        },
        include: {
          food: {
            select: {
              id: true,
              name: true,
              price: true,
              image: true,
              rating: true,
              category: true,
            },
          },
        },
      });
    }
  });

  return {
    message: "Added to cart successfully",
    item: {
      ...result,
      subtotal: result.food.price * result.quantity,
    },
  };
};

// BATCH ADD TO CART
const batchAddToCart = async (userId, items) => {
  // Validate tất cả foods tồn tại
  await Promise.all(items.map((item) => checkFoodExists(item.foodId)));

  const cart = await getOrCreateCart(userId);

  const results = await prisma.$transaction(async (tx) => {
    const operations = items.map(async (item) => {
      const existingItem = await tx.cartItem.findUnique({
        where: {
          cartId_foodId: {
            cartId: cart.id,
            foodId: item.foodId,
          },
        },
      });

      if (existingItem) {
        return tx.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + item.quantity,
          },
        });
      } else {
        return tx.cartItem.create({
          data: {
            cartId: cart.id,
            foodId: item.foodId,
            quantity: item.quantity,
          },
        });
      }
    });

    return Promise.all(operations);
  });

  return {
    message: `Added ${results.length} items to cart successfully`,
    count: results.length,
  };
};

// GET CART ITEMS
const getCartItems = async (userId, options = {}) => {
  const { includeUnavailable = false } = options;

  const cart = await prisma.cart.findUnique({
    where: { userId: String(userId) },
    select: { id: true },
  });

  if (!cart) {
    return [];
  }

  const items = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
      ...(includeUnavailable
        ? {}
        : {
            food: {
              isAvailable: true,
            },
          }),
    },
    include: {
      food: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          rating: true,
          category: true,
          description: true,
          isAvailable: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Thêm tính toán subtotal
  return items.map((item) => ({
    ...item,
    subtotal: item.food.price * item.quantity,
    isAvailable: item.food.isAvailable,
  }));
};

// GET CART SUMMARY
const getCartSummary = async (userId) => {
  const items = await getCartItems(userId, { includeUnavailable: false });

  const summary = items.reduce(
    (acc, item) => {
      if (item.isAvailable) {
        acc.totalItems += item.quantity;
        acc.totalPrice += item.subtotal;
        acc.availableItemCount += 1;
      } else {
        acc.unavailableItems += 1;
      }
      return acc;
    },
    {
      totalItems: 0, // Tổng số lượng món
      totalPrice: 0, // Tổng giá
      availableItemCount: 0, // Số loại món available
      unavailableItems: 0, // Số loại món unavailable
      itemCount: items.length, // Tổng số loại món
    }
  );

  return summary;
};

// UPDATE CART ITEM QUANTITY
const updateCartItemQuantity = async (itemId, quantity, userId) => {
  if (quantity < 1) {
    throw new Error("Quantity must be >= 1");
  }

  // Lấy cart item
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: {
      cart: {
        select: { userId: true },
      },
      food: {
        select: {
          name: true,
          isAvailable: true,
        },
      },
    },
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  // Kiểm tra quyền sở hữu
  if (cartItem.cart.userId !== String(userId)) {
    throw new Error("You do not own this cart item");
  }

  // Kiểm tra món ăn còn available không
  if (!cartItem.food.isAvailable) {
    throw new Error(`"${cartItem.food.name}" is no longer available`);
  }

  // Update quantity
  const updatedItem = await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
    include: {
      food: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          rating: true,
          category: true,
          isAvailable: true,
        },
      },
    },
  });

  return {
    ...updatedItem,
    subtotal: updatedItem.food.price * updatedItem.quantity,
  };
};

// REMOVE CART ITEM
const removeCartItem = async (itemId, userId) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: itemId },
    include: {
      cart: {
        select: { userId: true },
      },
      food: {
        select: { name: true },
      },
    },
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  // Kiểm tra quyền sở hữu
  if (cartItem.cart.userId !== String(userId)) {
    throw new Error("You do not own this cart item");
  }

  await prisma.cartItem.delete({
    where: { id: itemId },
  });

  return {
    message: "Cart item removed successfully",
    itemId,
    foodName: cartItem.food.name,
  };
};

// CLEAR USER CART
const clearUserCart = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: String(userId) },
    select: { id: true },
  });

  if (!cart) {
    return {
      message: "Cart is already empty",
      deletedCount: 0,
    };
  }

  const result = await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return {
    message: "Cart cleared successfully",
    deletedCount: result.count,
  };
};

// VALIDATE CART ITEMS (Đơn giản hóa - chỉ check available)
const validateCartItems = async (userId, itemIds) => {
  const whereClause = itemIds
    ? {
        id: { in: itemIds },
        cart: { userId: String(userId) },
      }
    : {
        cart: { userId: String(userId) },
      };

  const items = await prisma.cartItem.findMany({
    where: whereClause,
    include: {
      food: {
        select: {
          id: true,
          name: true,
          price: true,
          isAvailable: true,
        },
      },
    },
  });

  if (items.length === 0) {
    return {
      isValid: false,
      items: [],
      validCount: 0,
      invalidCount: 0,
      totalPrice: 0,
      message: "No items found in cart",
    };
  }

  const validation = items.map((item) => {
    const issues = [];

    if (!item.food.isAvailable) {
      issues.push("Food is currently unavailable");
    }

    const isValid = issues.length === 0;

    return {
      itemId: item.id,
      foodId: item.food.id,
      foodName: item.food.name,
      quantity: item.quantity,
      currentPrice: item.food.price,
      subtotal: item.food.price * item.quantity,
      isValid,
      issues,
    };
  });

  const validItems = validation.filter((v) => v.isValid);
  const invalidItems = validation.filter((v) => !v.isValid);

  return {
    isValid: invalidItems.length === 0,
    items: validation,
    validCount: validItems.length,
    invalidCount: invalidItems.length,
    totalPrice: validItems.reduce((sum, item) => sum + item.subtotal, 0),
    validItems,
    invalidItems,
  };
};

// GET CART COUNT
const getCartCount = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: String(userId) },
    select: {
      items: {
        select: {
          quantity: true,
        },
      },
    },
  });

  if (!cart) {
    return { totalItems: 0, itemCount: 0 };
  }

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    totalItems, // Tổng số lượng món (2 phở + 3 bún = 5)
    itemCount: cart.items.length, // Số loại món (phở, bún = 2)
  };
};

// MERGE CARTS (Khi guest user login)
const mergeCarts = async (guestUserId, loggedInUserId) => {
  const guestCart = await prisma.cart.findUnique({
    where: { userId: String(guestUserId) },
    include: { items: true },
  });

  if (!guestCart || guestCart.items.length === 0) {
    return { message: "No guest cart to merge", mergedCount: 0 };
  }

  const userCart = await getOrCreateCart(loggedInUserId);

  const mergeOperations = await prisma.$transaction(async (tx) => {
    return Promise.all(
      guestCart.items.map(async (guestItem) => {
        const existingItem = await tx.cartItem.findUnique({
          where: {
            cartId_foodId: {
              cartId: userCart.id,
              foodId: guestItem.foodId,
            },
          },
        });

        if (existingItem) {
          // Cộng dồn quantity
          return tx.cartItem.update({
            where: { id: existingItem.id },
            data: {
              quantity: existingItem.quantity + guestItem.quantity,
            },
          });
        } else {
          // Tạo mới
          return tx.cartItem.create({
            data: {
              cartId: userCart.id,
              foodId: guestItem.foodId,
              quantity: guestItem.quantity,
            },
          });
        }
      })
    );
  });

  // Xóa guest cart
  await prisma.cart.delete({
    where: { id: guestCart.id },
  });

  return {
    message: "Carts merged successfully",
    mergedCount: mergeOperations.length,
  };
};

// ============= EXPORTS =============
module.exports = {
  addToCart,
  batchAddToCart,
  getCartItems,
  getCartSummary,
  updateCartItemQuantity,
  removeCartItem,
  clearUserCart,
  validateCartItems,
  getCartCount,
  mergeCarts,
};

// src/context/CartContext.jsx

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from 'react'

const CartContext = createContext()

/* -------------------------------- */
/* INITIAL STATE */
/* -------------------------------- */

const initialState = {
  items: [],
}

/* -------------------------------- */
/* CART REDUCER */
/* -------------------------------- */

function cartReducer(state, action) {
  switch (action.type) {

    /* ADD ITEM */
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size
      )

      // IF ITEM EXISTS
      if (existingItem) {
        return {
          ...state,

          items: state.items.map((item) =>
            item.id === action.payload.id &&
            item.size === action.payload.size
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    (action.payload.quantity || 1),
                }
              : item
          ),
        }
      }

      // ADD NEW ITEM
      return {
        ...state,

        items: [
          ...state.items,
          {
            ...action.payload,
            quantity:
              action.payload.quantity || 1,
          },
        ],
      }
    }

    /* REMOVE ITEM */
    case 'REMOVE_ITEM':
      return {
        ...state,

        items: state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id &&
              item.size === action.payload.size
            )
        ),
      }

    /* UPDATE QUANTITY */
    case 'UPDATE_QTY':
      return {
        ...state,

        items: state.items.map((item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size
            ? {
                ...item,
                quantity: action.payload.quantity,
              }
            : item
        ),
      }

    /* CLEAR CART */
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      }

    default:
      return state
  }
}

/* -------------------------------- */
/* PROVIDER */
/* -------------------------------- */

export function CartProvider({ children }) {

  // LOCAL STORAGE LOAD
  const storedCart =
    localStorage.getItem('sara-cart')

  const parsedCart = storedCart
    ? JSON.parse(storedCart)
    : initialState

  const [state, dispatch] = useReducer(
    cartReducer,
    parsedCart
  )

  /* SAVE TO LOCAL STORAGE */
  useEffect(() => {
    localStorage.setItem(
      'sara-cart',
      JSON.stringify(state)
    )
  }, [state])

  /* -------------------------------- */
  /* ACTIONS */
  /* -------------------------------- */

  // ADD ITEM
  const addItem = (item) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: item,
    })
  }

  // REMOVE ITEM
  const removeItem = (id, size) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { id, size },
    })
  }

  // UPDATE QUANTITY
  const updateQty = (id, size, quantity) => {

    // PREVENT 0 OR NEGATIVE
    if (quantity < 1) return

    dispatch({
      type: 'UPDATE_QTY',
      payload: {
        id,
        size,
        quantity,
      },
    })
  }

  // CLEAR CART
  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    })
  }

  /* -------------------------------- */
  /* TOTALS */
  /* -------------------------------- */

  // TOTAL ITEMS
  const totalItems = state.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  // TOTAL PRICE
  const totalPrice = state.items.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  )

  /* -------------------------------- */
  /* CONTEXT VALUE */
  /* -------------------------------- */

  const value = {
    items: state.items,

    addItem,
    removeItem,
    updateQty,
    clearCart,

    totalItems,
    totalPrice,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

/* -------------------------------- */
/* CUSTOM HOOK */
/* -------------------------------- */

export const useCart = () => {
  return useContext(CartContext)
}
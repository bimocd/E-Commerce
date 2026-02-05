import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";


export const CartContext = createContext()

export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({children}) => { 
    const [cart, setCart] = useState([])

    const addToCart = (item) => { 
        setCart(prev => [...prev,item])
    }

    const removeFromCart = (id) => { 
        const filteredItems = cart.filter(element => {
            return element.id !== id
        })

        setCart(filteredItems)
    }


}


const value = {
    cart,
    addToCart,
    removeFromCart
}

return <CartContext.Provider value={value}>
    {children}
</CartContext.Provider>
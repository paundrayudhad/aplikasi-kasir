'use client'

import { useState, useEffect } from 'react'
import { Plus, Minus, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  price: number
}

interface CartItem extends Product {
  quantity: number
}

const initialProducts: Product[] = [
  { id: 1, name: "Nasi Goreng", price: 15000 },
  { id: 2, name: "Mie Ayam", price: 12000 },
  { id: 3, name: "Es Teh", price: 3000 },
  { id: 4, name: "Sate Ayam", price: 20000 },
]

export default function KasirApp() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setProducts(initialProducts)
    setIsClient(true)
  }, [])

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...currentCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
      return currentCart.filter(item => item.id !== productId)
    })
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (!isClient) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Aplikasi Kasir</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Daftar Produk</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {products.map(product => (
                <li key={product.id} className="flex justify-between items-center">
                  <span>{product.name} - Rp {product.price.toLocaleString()}</span>
                  <Button onClick={() => addToCart(product)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Keranjang Belanja</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between items-center">
                  <span>{item.name} x {item.quantity}</span>
                  <div className="flex items-center space-x-2">
                    <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                    <Button variant="outline" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => addToCart(item)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-lg">Rp {total.toLocaleString()}</span>
          </CardFooter>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input type="number" placeholder="Jumlah uang" className="flex-grow" />
            <Button className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Bayar</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
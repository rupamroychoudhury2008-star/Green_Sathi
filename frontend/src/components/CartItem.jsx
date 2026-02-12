import { useCart } from "../context/CartContext";

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>
        {item.name} × {item.qty}
      </span>
      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
}

export default CartItem;

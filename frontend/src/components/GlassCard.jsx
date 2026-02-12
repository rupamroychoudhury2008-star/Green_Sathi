import "./GlassCard.css";

export default function GlassCard({ image, title, price, children, buttonText, onClick }) {
  return (
    <div className="glass-card">
      {image && <img src={image} alt={title} />}
      
      {title && <h3>{title}</h3>}
      
      {price && <p className="price">₹ {price}</p>}
      
      {children}

      {buttonText && (
        <button onClick={onClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
}

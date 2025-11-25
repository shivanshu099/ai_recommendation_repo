import React, { useState } from "react";
import { products } from "./products";
import { getAIRecommendations } from "./RecommendationService";

function App() {
  const [input, setInput] = useState("");
  const [recommended, setRecommended] = useState([]);

  async function handleRecommend() {
    const ids = await getAIRecommendations(input, products);
    const filtered = products.filter(p => ids.includes(p.id));
    setRecommended(filtered);
  }

  return (
    <div style={{ margin: "40px", fontFamily: "Arial" }}>
      <h1>AI Product Recommendation System</h1>

      <input
        type="text"
        placeholder="e.g. I want a phone under $500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      <button
        onClick={handleRecommend}
        style={{ marginLeft: "10px", padding: "10px 20px" }}
      >
        Recommend
      </button>

      <h2 style={{ marginTop: "30px" }}>Recommendations:</h2>
      {recommended.length === 0 && <p>No recommendations yet.</p>}

      <ul>
        {recommended.map((product) => (
          <li key={product.id}>
            {product.name} — ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

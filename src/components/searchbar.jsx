import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const cityList = [
    { id: "ankara", name: "Ankara" },
    { id: "istanbul", name: "İstanbul" },
    { id: "izmir", name: "İzmir" },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = cityList.filter((c) =>
      c.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelect = (cityId) => {
    setQuery("");
    setSuggestions([]);
    onSearch(cityId); // ID gönderiyoruz!
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = cityList.find(
      (c) => c.name.toLowerCase() === query.toLowerCase()
    );
    if (found) {
      handleSelect(found.id);
    } else {
      alert("Geçerli bir şehir seçiniz.");
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form" autoComplete="off">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Şehir giriniz..."
          className="search-input"
        />
        <button type="submit" className="search-button">Göster</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((s) => (
            <li key={s.id} onClick={() => handleSelect(s.id)}>
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
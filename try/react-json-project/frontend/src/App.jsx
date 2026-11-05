import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setMessage(result.message);
      setForm({ name: "", email: "" });
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Save Data to JSON</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Data</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default App;
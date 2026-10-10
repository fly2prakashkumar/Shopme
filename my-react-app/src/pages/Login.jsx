import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (
            email.trim() === "admin@gmail.com" &&
            password === "Password"
        ) {
            sessionStorage.setItem("isLoggedIn", "true");
            navigate("/");
        } else {
            setError("Invalid email or password. Please try again.");
        }
    };

    if (isLoggedIn) {
        return (
            <div className="login-container">
                <div className="login-card">
                    <h1>Welcome, Admin! 🎉</h1>
                    <p className="subtitle">You have successfully logged in.</p>
                    <button
                        className="login-button"
                        onClick={() => {
                            setIsLoggedIn(false);
                            setEmail("");
                            setPassword("");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome Back 👋</h1>
                <p className="subtitle">Sign in to your admin account</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <div className="password-field">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {error && (
                        <p role="alert" style={{ color: "#dc2626", fontSize: "13px" }}>
                            {error}
                        </p>
                    )}

                    <button type="submit" className="login-button">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
import React from 'react'
import styles from "../style";

const SignUp = () => (
    <section classNa="container forms">
    <div class="form login">
        <div class="form-content">
            <header>Sign In</header>
            <form action="#">
                <div class="field input-field">
                    <input type="email"  placeholder="Email" class="password" />
                </div>
                <div class="field input-field">
                    <input type="password" placeholder="password" class="password" />
                </div>
                <div class="form-link">
                    <a href="#" class="forgot-pass">Forgot Password</a>
                </div>
                <div class="field button-field">
                    <button>Login</button>
                </div>
                <div class="form-link">
                    <span>Already have an account? <a href="form.html" class="signup-link">Login</a></span>
                </div>
            </form>
        </div>
    </div>
</section>
  );


export default SignUp;
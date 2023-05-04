import React from 'react';

export default function Signup() {
    return (
        <section className=''>
            <h2>Join Here!</h2>
            <h2>Or click here to </h2>
            <form class="ui form grid divided two column ">
                <h3>Sign up</h3>
                <div class="six wide field">
                    <label>Username</label>
                    <input placeholder="Username"/>
                </div>
                <div class="field">
                    <label>Email</label>
                    <input type="email" placeholder="email@test.com"/>
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="password" placeholder="*********"/>
                </div>
                <button class="ui button" type="submit">Submit</button>
            </form>

            <form class="ui form grid divided two column ">
                <h3>Log in</h3>
                <div class="field">
                    <label>Email</label>
                    <input type="email" placeholder="email@test.com"/>
                </div>
                <div class="field">
                    <label>Password</label>
                    <input type="password" placeholder="*********"/>
                </div>
                <button class="ui button" type="submit">Submit</button>
            </form>
        </section>
    )
}
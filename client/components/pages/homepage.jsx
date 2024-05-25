import React from 'react';
import '../../resources/styles/styles.css'

export function Homepage() {
    return (
        <div className="container">
            <header>
                <h1>Header</h1>
            </header>
            <main>
                <div>
                    <h2>Main Content</h2>
                    <p>This is the main content area.</p>
                </div>
            </main>
            <footer>
                <p>Footer</p>
            </footer>
        </div>
    );
}
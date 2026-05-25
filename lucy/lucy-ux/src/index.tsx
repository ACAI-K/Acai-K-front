/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')

if (root) {
    render(() => <App />, root);
} else {
    console.error("No se encontró el elemento #root");
}

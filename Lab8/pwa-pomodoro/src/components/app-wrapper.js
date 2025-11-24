class AppWrapper extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        
        // Define la duración inicial por defecto (25 minutos = 1500 segundos)
        this.defaultDuration = 1500; 

        // Estructura HTML y CSS con los componentes integrados
        shadowRoot.innerHTML = `
            <style>
                /* Estilos específicos para el wrapper, usando variables de main.scss */
                .container {
                    text-align: center;
                    padding: 20px;
                    background-color: var(--bg-color, #f0f0f0);
                    max-width: 400px;
                    margin: 20px auto;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
                h1 {
                    color: var(--text-color, black);
                    margin-bottom: 20px;
                }
                /* Estilo del input de configuración del tiempo */
                .config-section {
                    margin-top: 20px;
                    padding: 15px;
                    border-top: 1px solid #ccc;
                }
                input[type="number"] {
                    padding: 8px;
                    font-size: 14px;
                    width: 80px;
                }
            </style>
            <div class="container">
                <!-- Imagen del logo (verifica la ruta si usas Webpack asset handling) -->
                <img src="src/assets/logos/TimerPWA-logos_transparent.png" alt="Logo PWA" width="80"/>
                <h1>PWA Pomodoro Timer</h1>
                
                <!-- Usa tu web component del timer con una duración inicial -->
                <timer-component id="mainTimer" duration="${this.defaultDuration}"></timer-component>

                <!-- Usa tu web component de sonido (oculto visualmente) -->
                <sound-player id="soundPlayer" src="src/assets/audio/alarma.mp3"></sound-player>

                <div class="config-section">
                    <label for="durationInput">Configurar tiempo (segundos):</label>
                    <input type="number" id="durationInput" min="1" value="${this.defaultDuration}">
                    <button id="setConfig">Establecer y Resetear</button>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        // Obtenemos referencias a los elementos en el Shadow DOM
        this.timerComponent = this.shadowRoot.getElementById('mainTimer');
        this.soundPlayerComponent = this.shadowRoot.getElementById('soundPlayer');
        this.durationInput = this.shadowRoot.getElementById('durationInput');
        this.setConfigButton = this.shadowRoot.getElementById('setConfig');

        // Lógica para conectar el input de configuración con el timer component
        this.setConfigButton.addEventListener('click', () => {
            const newDuration = parseInt(this.durationInput.value, 10);
            if (!isNaN(newDuration) && newDuration > 0) {
                // Llamamos al método público 'resetTimer' del componente Timer 
                // para establecer la nueva duración y reiniciarlo.
                this.timerComponent.resetTimer(newDuration);
            } else {
                alert("Por favor, introduce un tiempo válido.");
            }
        });

        // Escuchamos el evento personalizado 'timer-finished' que emite el Timer Component
        this.timerComponent.addEventListener('timer-finished', () => {
            console.log("Evento timer-finished recibido en AppWrapper. Reproduciendo sonido.");
            // Llamamos al método público 'play' del componente SoundPlayer
            this.soundPlayerComponent.play();
        });
    }
}

// Definimos el web component personalizado
customElements.define('app-wrapper', AppWrapper);

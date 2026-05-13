const fs = require('fs');

const dispositivos = ['Servidor-Core', 'Firewall-Principal', 'Switch-Cali', 'Switch-Popayan', 'Enlace-Bogota'];
const logs = [];
const hoy = new Date();

// Generamos datos minuto a minuto para un día completo (1440 registros)
for (let i = 0; i < 1440; i++) {
    const tiempoActual = new Date(hoy.getTime() + (i * 60 * 1000));
    const hora = tiempoActual.getHours();

    dispositivos.forEach(equipo => {
        // Simulación: El tráfico sube en horas de oficina (8am a 6pm)
        let traficoBase = (hora >= 8 && hora <= 18) ? Math.random() * 80 + 20 : Math.random() * 15 + 5;
        
        logs.push({
            timestamp: tiempoActual.toISOString(),
            equipo: equipo,
            consumo_ancho_banda_mbps: parseFloat(traficoBase.toFixed(2)),
            latencia_ms: Math.floor(Math.random() * 40 + 5),
            carga_cpu: Math.floor(Math.random() * 100),
            estado: (Math.random() > 0.98) ? "Alerta" : "Normal" // Simula fallas aleatorias
        });
    });
}

fs.writeFileSync('datos_monitoreo_red.json', JSON.stringify(logs, null, 2));
console.log("🚀 Sistema NOC inicializado: 1.440 minutos de red generados.");
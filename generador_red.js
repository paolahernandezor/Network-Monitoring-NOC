const fs = require('fs');
const logs = [];
const dispositivos = [
    { nombre: 'Core-Router', critico: true },
    { nombre: 'Firewall-Perimeter', critico: true },
    { nombre: 'Switch-L3-Popayan', critico: false },
    { nombre: 'Access-Point-Sede1', critico: false }
];

for (let i = 0; i < 1440; i++) {
    const tiempo = new Date(new Date().getTime() + (i * 60000));
    const hora = tiempo.getHours();

    dispositivos.forEach(d => {
        // Simulación de carga laboral: pico entre 9am y 11am
        let factorCarga = (hora >= 9 && hora <= 11) ? 2.5 : 1;
        let cpu = Math.min(100, (Math.random() * 30 * factorCarga) + 10);
        let latencia = (cpu > 80) ? Math.random() * 200 + 50 : Math.random() * 20 + 2;

        logs.push({
            timestamp: tiempo.toISOString(),
            dispositivo: d.nombre,
            cpu_usage: parseFloat(cpu.toFixed(2)),
            latencia_ms: parseFloat(latencia.toFixed(2)),
            ancho_banda_mbps: parseFloat((Math.random() * 500 * (cpu/100)).toFixed(2)),
            // Clasificación profesional de estado
            status: (cpu > 90 || latencia > 150) ? "Critical" : (cpu > 75) ? "Warning" : "Healthy",
            // Nueva métrica de impacto económico
            costo_riesgo: (cpu > 90) ? parseFloat((Math.random() * 100).toFixed(2)) : 0
        });
    });
}

fs.writeFileSync('datos_monitoreo_red_v2.json', JSON.stringify(logs, null, 2));
console.log(" Dataset robusto generado: logs de correlación y estados .");
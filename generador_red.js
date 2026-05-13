const fs = require('fs');
const logs = [];

// Inventario de nodos para mi laboratorio de pruebas - Proyecto Monitoreo Personal
const nodosActivos = [
    { tag: 'GW-HOME-LAB', descripcion: 'Gateway Residencial Principal', critico: true },
    { tag: 'SRV-DATA-STORAGE', descripcion: 'Servidor de Archivos Local', critico: true },
    { tag: 'WORKSTATION-01', descripcion: 'Estación de Trabajo - Edición', esCritico: false },
    { tag: 'NET-EXTENDER', descripcion: 'Repetidor de Señal Exterior', esCritico: false }
];

// Generando datos de rendimiento para simular una semana de carga (Data Sprints)
for (let i = 0; i < 2000; i++) {
    const ahora = new Date();
    const tiempo = new Date(ahora.getTime() + (i * 60000));
    const horaActual = tiempo.getHours();

    nodosActivos.forEach(item => {
        // Simulo una carga aleatoria con picos nocturnos (cuando yo usaría el lab)
        let actividadNocturna = (horaActual >= 19 && horaActual <= 23) ? 2.8 : 0.9;
        let porcentajeCpu = Math.min(100, (Math.random() * 22 * actividadNocturna) + 8);
        
        // Latencia basada en congestión de red simulada
        let latenciaRed = (porcentajeCpu > 82) ? Math.random() * 150 + 30 : Math.random() * 12 + 4;

        logs.push({
            instante: tiempo.toISOString(),
            id_dispositivo: item.tag,
            nombre_comun: item.descripcion,
            metrica_cpu: parseFloat(porcentajeCpu.toFixed(2)),
            ping_ms: parseFloat(latenciaRed.toFixed(2)),
            consumo_mb: parseFloat((Math.random() * 450 * (porcentajeCpu/100)).toFixed(2)),
            
            // Lógica de validación de salud del sistema
            alerta: (porcentajeCpu > 85 || latenciaRed > 120) ? "Critical" : (porcentajeCpu > 65) ? "Warning" : "Healthy",
            
            // Estimación de costo por mantenimiento reactivo
            valor_riesgo: (porcentajeCpu > 85) ? parseFloat((Math.random() * 125).toFixed(2)) : 0
        });
    });
}

// Guardando el dataset para procesar en Power BI
fs.writeFileSync('mi_telemetria_red.json', JSON.stringify(logs, null, 2));
console.log("Dataset generado: mi_telemetria_red.json listo para análisis.");
# 🏋️ Gym Manager - Sistema de Gestión de Gimnasio

Sistema completo para gestionar miembros, pagos y recordatorios de tu gimnasio con integración WhatsApp.

## 🚀 Características

- ✅ **Gestión de Miembros** - Agregar, editar y gestionar miembros
- ✅ **Control de Pagos** - Seguimiento de pagos y estados
- ✅ **Recordatorios WhatsApp** - Envío automático de recordatorios
- ✅ **Dashboard Completo** - Estadísticas y métricas en tiempo real
- ✅ **Responsive Design** - Funciona en móvil, tablet y desktop
- ✅ **TypeScript** - Código type-safe y mantenible

## 🛠️ Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos modernos

## 📦 Instalación

1. **Clona el repositorio**
\`\`\`bash
git clone <tu-repo>
cd gym-reminder-app
\`\`\`

2. **Instala las dependencias**
\`\`\`bash
npm install
# o
yarn install
# o
pnpm install
\`\`\`

3. **Configura las variables de entorno**
\`\`\`bash
cp .env.example .env.local
# Edita .env.local con tus configuraciones
\`\`\`

4. **Ejecuta el servidor de desarrollo**
\`\`\`bash
npm run dev
# o
yarn dev
# o
pnpm dev
\`\`\`

5. **Abre tu navegador**
\`\`\`
http://localhost:3000
\`\`\`

## 📱 Uso

### Dashboard Principal
- Ve estadísticas generales de tu gimnasio
- Accede rápidamente a todas las funciones

### Gestión de Miembros
- Agrega nuevos miembros con información completa
- Ve el estado de pagos de cada miembro
- Busca y filtra miembros fácilmente

### Recordatorios
- Selecciona miembros con pagos pendientes
- Personaliza mensajes de recordatorio
- Envía recordatorios por WhatsApp

### Historial de Pagos
- Registra nuevos pagos
- Ve el historial completo de transacciones
- Filtra por estado, método de pago y fechas

## 🔧 Scripts Disponibles

\`\`\`bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run start        # Inicia servidor de producción
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica tipos TypeScript
npm run format       # Formatea código con Prettier
npm run clean        # Limpia archivos de build
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
gym-reminder-app/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Dashboard principal
│   ├── members/           # Gestión de miembros
│   ├── payments/          # Historial de pagos
│   └── reminders/         # Sistema de recordatorios
├── components/            # Componentes reutilizables
│   └── ui/               # Componentes de UI
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y tipos
├── public/               # Archivos estáticos
└── ...archivos de config
\`\`\`

## 🌐 Integración WhatsApp

La aplicación está preparada para integrar con:

- **WhatsApp Web** (implementado)
- **WhatsApp Business API**
- **Twilio WhatsApp API**
- **Meta WhatsApp Cloud API**

## 🚀 Despliegue

### Vercel (Recomendado)
\`\`\`bash
npm run build
# Conecta tu repo con Vercel
\`\`\`

### Netlify
\`\`\`bash
npm run build
# Sube la carpeta .next a Netlify
\`\`\`

### Docker
\`\`\`bash
# Crear imagen
docker build -t gym-manager .

# Ejecutar contenedor
docker run -p 3000:3000 gym-manager
\`\`\`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Email: support@gym-manager.com
- 💬 WhatsApp: +1234567890
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/gym-reminder-app/issues)

## 🔮 Próximas Características

- [ ] Autenticación de usuarios
- [ ] Base de datos persistente
- [ ] Reportes avanzados
- [ ] Aplicación móvil
- [ ] Integración con pasarelas de pago
- [ ] Sistema de notificaciones push
- [ ] API REST completa
- [ ] Modo offline

---

Hecho con ❤️ para la comunidad fitness

export default function Checkout() {
    return (
        <div class="max-w-2xl mx-auto p-8">
            <h2 class="text-3xl font-bold mb-8">Finalizar Reserva</h2>

            <form class="space-y-6">
                {/* Sección de datos de usuario */}
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h4 class="font-bold mb-4">Tus datos</h4>
                    <div class="grid grid-cols-1 gap-4">
                        <input type="text" placeholder="Nombre completo" class="w-full p-3 border rounded-lg" />
                        <input type="email" placeholder="Correo electrónico" class="w-full p-3 border rounded-lg" />
                    </div>
                </div>

                {/* Sección de fechas */}
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h4 class="font-bold mb-4">Fechas seleccionadas</h4>
                    <div class="flex gap-4">
                        <input type="date" class="w-full p-3 border rounded-lg" />
                        <input type="date" class="w-full p-3 border rounded-lg" />
                    </div>
                </div>

                <button type="submit" class="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition">
                    Confirmar y pagar
                </button>
            </form>
        </div>
    );
}
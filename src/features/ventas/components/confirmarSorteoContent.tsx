import { Pressable, Text, View } from "react-native";
import { AlertTriangle } from "lucide-react-native";

type ConfirmarSorteoContentProps = {
    onCancel: () => void;
    onConfirm: () => void;
};

export default function ConfirmarSorteoContent({
    onCancel,
    onConfirm,
}: ConfirmarSorteoContentProps) {
    return (
        <View>
            <View className="items-center">
                <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-amber-400/10">
                    <AlertTriangle size={32} color="#FFD166" />
                </View>

                <Text className="text-center text-lg font-bold text-white">
                    Esta acción finalizará la rifa
                </Text>

                <Text className="mt-3 text-center text-sm leading-6 text-neutral-400">
                    Al iniciar el sorteo, esta rifa quedará finalizada.
                    {"\n\n"}
                    Ya no podrás agregar participantes, editar ventas
                    ni modificar la información de la rifa.
                    {"\n\n"}
                    ¿Estás seguro de que deseas continuar?
                </Text>
            </View>

            <View className="mt-6 gap-3">
                <Pressable
                    onPress={onConfirm}
                    className="items-center rounded-2xl bg-indigo-600 py-4 active:opacity-80"
                >
                    <Text className="font-bold text-white">
                        SÍ, CONTINUAR CON EL SORTEO
                    </Text>
                </Pressable>

                <Pressable
                    onPress={onCancel}
                    className="items-center rounded-2xl border border-neutral-700 bg-neutral-800 py-4 active:opacity-80"
                >
                    <Text className="font-bold text-neutral-300">
                        CANCELAR
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
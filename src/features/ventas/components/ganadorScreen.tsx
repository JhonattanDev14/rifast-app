import { View, Text, TouchableOpacity } from "react-native";
import { Trophy, X } from "lucide-react-native";

interface Props {
    ganador: {
        comprador: string;
        numero: number;
        telefono: string;
        venta_id: number;
    };
    onClose: () => void;
}

export default function ganadorScreen({ ganador, onClose }: Props) {
    return (
        <View className="items-center rounded-3xl border border-[#343B49] bg-[#1E2229] p-6">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-[#FFD166]/15">
                <Trophy size={34} color="#FFD166" />
            </View>

            <Text className="text-sm font-bold tracking-widest text-[#FFD166]">
                ¡TENEMOS GANADOR!
            </Text>

            <Text className="mb-2 mt-5 text-5xl font-black text-[#64D8FF]">
                #{String(ganador.numero).padStart(3, "0")}
            </Text>

            <Text className="mt-2 text-sm text-gray-400">
                GANADOR
            </Text>

            <Text className="mb-6 mt-1 text-center text-2xl font-bold text-white">
                {ganador.comprador}
            </Text>

            <Text className="mb-6 text-center text-sm text-[#39FF88]">
                ¡Felicidades! 🎉
            </Text>

            <TouchableOpacity
                onPress={onClose}
                className="w-full flex-row items-center justify-center rounded-xl bg-[#4F7CFF] py-4"
            >
                <X size={18} color="#FFFFFF" />
                <Text className="ml-2 font-bold text-white">
                    Cerrar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
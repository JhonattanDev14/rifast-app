import { CalendarDays, Ticket, Zap } from "lucide-react-native";
import { Text, View } from "react-native";

type Talonario = {
    nombre: string;
    precio: number;
    fecha: string;
};

type Props = {
    talonario?: Talonario;
};

export default function RifaHeader({ talonario }: Props) {
    if (!talonario) return null;

    const fechaFinal = new Date(talonario.fecha);
    const hoy = new Date();

    const diferencia = fechaFinal.getTime() - hoy.getTime();
    const diasRestantes = Math.ceil(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const estaPorExpirar = diasRestantes >= 0 && diasRestantes <= 3;
    const finalizada = diasRestantes < 0;

    return (
        <View className="mx-3 overflow-hidden rounded-2xl border border-[#263B70] bg-[#151922]">
            <View className="h-1 bg-[#4F7CFF]" />

            <View className="p-4">
                <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                        <Text className="text-xs font-semibold uppercase tracking-widest text-[#4F7CFF]">
                            Rifast
                        </Text>

                        <Text
                            className="mt-1 text-xl font-bold text-white"
                            numberOfLines={1}
                        >
                            {talonario.nombre} 
                        </Text>
                    </View>

                    <View className="ml-4 items-end">
                        <Text className="text-xs text-gray-500">
                            BOLETA
                        </Text>

                        <Text className="text-lg font-bold text-[#64D8FF]">
                            ${talonario.precio.toLocaleString("es-CO")}
                        </Text>
                    </View>
                </View>

                <View className="my-3 h-px bg-[#252B38]" />

                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <CalendarDays
                            size={17}
                            color={
                                estaPorExpirar || finalizada
                                    ? "#FF4D6D"
                                    : "#4F7CFF"
                            }
                        />

                        <Text className="ml-2 text-sm text-gray-400">
                            Finaliza{" "}
                            <Text className="font-semibold text-gray-200">
                                {fechaFinal.toLocaleDateString("es-CO", {
                                    day: "numeric",
                                    month: "short",
                                })}
                            </Text>
                        </Text>
                    </View>

                    {finalizada ? (
                        <View className="flex-row items-center rounded-full bg-[#3A1823] px-3 py-1">
                            <Zap size={13} color="#FF4D6D" />
                            <Text className="ml-1 text-xs font-bold text-[#FF4D6D]">
                                FINALIZADA
                            </Text>
                        </View>
                    ) : estaPorExpirar ? (
                        <View className="flex-row items-center rounded-full bg-[#3A2D16] px-3 py-1">
                            <Zap size={13} color="#FFD166" />
                            <Text className="ml-1 text-xs font-bold text-[#FFD166]">
                                {diasRestantes}{" "}
                                {diasRestantes === 1 ? "DÍA" : "DÍAS"}
                            </Text>
                        </View>
                    ) : (
                        <View className="flex-row items-center rounded-full bg-[#152A2A] px-3 py-1">
                            <View className="h-2 w-2 rounded-full bg-[#39FF88]" />
                            <Text className="ml-2 text-xs font-bold text-[#39FF88]">
                                ACTIVA
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}
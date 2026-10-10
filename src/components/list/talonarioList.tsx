import { Pressable, Text, View } from "react-native";
import type { Talonario } from "../../types/talonario";
import { formatNumber } from "@/components/ui/formatters";
import { router } from "expo-router";
import { CalendarDays, ChevronRight, Ticket, Zap } from "lucide-react-native";
import Separator from "@/components/ui/Separator";

type Props = {
    talonarios: Talonario[];
    onTalonarioPress: (talonario: Talonario) => void;
};

export default function TalonarioList({
    talonarios,
    onTalonarioPress,
}: Props) {

    if (talonarios.length === 0) {
        return (
            <View className="mt-5 items-center rounded-2xl border border-[#263B70] bg-[#151922] px-6 py-10">
                <Ticket size={32} color="#4F7CFF" />

                <Text className="mt-4 text-base font-semibold text-gray-200">
                    Aún no tienes rifas
                </Text>

                <Text className="mt-2 text-center text-sm text-gray-500">
                    Crea tu primera rifa para comenzar.
                </Text>
            </View>
        );
    }

    return (
        <>
            {talonarios.map((talonario) => {
                const [año, mes, dia] = talonario.fecha.slice(0, 10).split("-").map(Number);
                const fechaFinal = new Date(año, mes - 1, dia);
                const hoy = new Date();

                const diferencia =
                    fechaFinal.getTime() - hoy.getTime();

                const diasRestantes = Math.ceil(
                    diferencia / (1000 * 60 * 60 * 24)
                );

                const finalizada = diasRestantes < 0;
                const estaPorExpirar =
                    diasRestantes >= 0 && diasRestantes <= 3;

                return (
                    <Pressable
                        key={talonario.id}
                        onPress={() => onTalonarioPress(talonario)}
                        className="mt-4 overflow-hidden rounded-2xl border border-[#263B70] bg-[#151922]"
                    >
                        <View className="h-1 bg-[#4F7CFF]" />

                        <View className="p-4">

                            {/* Encabezado */}
                            <View className="flex-row items-start justify-between">
                                <View className="flex-1">
                                    <Text className="text-xs font-semibold uppercase tracking-widest text-[#4F7CFF]">
                                        Rifa
                                    </Text>

                                    <Text
                                        className="mt-1 text-xl font-bold text-white"
                                        numberOfLines={1}
                                    >
                                        {talonario.nombre}
                                    </Text>
                                </View>

                                {finalizada ? (
                                    <View className="rounded-full bg-[#3A1823] px-3 py-1">
                                        <Text className="text-xs font-bold text-[#FF4D6D]">
                                            FINALIZADA
                                        </Text>
                                    </View>
                                ) : estaPorExpirar ? (
                                    <View className="flex-row items-center rounded-full bg-[#3A2D16] px-3 py-1">
                                        <Zap size={12} color="#FFD166" />
                                        <Text className="ml-1 text-xs font-bold text-[#FFD166]">
                                            {diasRestantes}{" "}
                                            {diasRestantes === 1
                                                ? "DÍA"
                                                : "DÍAS"}
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

                            <View className="my-4 h-px bg-[#252B38]" />

                            {/* Información */}
                            <View className="flex-row justify-between">

                                <View>
                                    <Text className="text-xs text-gray-500">
                                        PRECIO
                                    </Text>

                                    <Text className="mt-1 text-lg font-bold text-[#64D8FF]">
                                        ${formatNumber(talonario.precio)}
                                    </Text>
                                </View>

                                <View>
                                    <Text className="text-xs text-gray-500">
                                        NÚMEROS
                                    </Text>

                                    <Text className="mt-1 text-lg font-bold text-white">
                                        {formatNumber(
                                            talonario.cantidad_numeros
                                        )}
                                    </Text>
                                </View>

                                <View>
                                    <Text className="text-xs text-gray-500">
                                        FINALIZA
                                    </Text>

                                    <View className="mt-1 flex-row items-center">
                                        <CalendarDays
                                            size={15}
                                            color={
                                                finalizada || estaPorExpirar
                                                    ? "#FF4D6D"
                                                    : "#4F7CFF"
                                            }
                                        />

                                        <Text
                                            className={`ml-1 text-sm font-semibold ${
                                                finalizada || estaPorExpirar
                                                    ? "text-[#FF4D6D]"
                                                    : "text-gray-300"
                                            }`}
                                        >
                                            {fechaFinal.toLocaleDateString(
                                                "es-CO",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                }
                                            )}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Acción */}
                            <View className="mt-4 flex-row justify-end">
                                <Pressable
                                    onPress={() => router.push(`/talonario/${talonario.id}`)}
                                    className="flex-row items-center rounded-full bg-[#4F7CFF] px-4 py-2"
                                >
                                    <Text className="mr-2 text-sm font-bold text-white">
                                        VER RIFA
                                    </Text>

                                    <ChevronRight size={17} color="white" />
                                </Pressable>
                            </View>

                        </View>
                    </Pressable>
                );
            })}
            <Separator />
        </>
    );
}
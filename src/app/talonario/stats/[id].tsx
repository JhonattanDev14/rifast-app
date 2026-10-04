import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { getTalonarioStats } from "@/features/ventas/services/ventaService";


export default function RifaStats() {
    const { id } = useLocalSearchParams();

    const stats = getTalonarioStats(Number(id));

    const porcentaje = stats
        ? (stats.vendidos / (stats.vendidos + stats.disponibles)) * 100
        : 0;

    return (
        <View className="flex-1 gap-4 bg-[#12161C] p-4">

            {/* Progreso */}
            <View className="overflow-hidden rounded-2xl border border-gray-700 bg-[#1E2229]">
                <View className="h-1 bg-[#4F7CFF]" />

                <View className="p-5">
                    <View className="self-start flex-row items-center gap-2 rounded-full border border-[#4F7CFF]/30 bg-[#4F7CFF]/10 px-3 py-1.5">
                        <View className="h-2 w-2 rounded-full bg-[#4F7CFF]" />

                        <Text className="text-xs font-semibold text-[#4F7CFF]">
                            PROGRESO
                        </Text>
                    </View>

                    <View className="mt-4 flex-row items-end justify-between">
                        <Text className="text-4xl font-bold text-white">
                            {Math.round(porcentaje)}%
                        </Text>

                        <Text className="text-sm text-gray-400">
                            {stats?.vendidos ?? 0} de{" "}
                            {(stats?.vendidos ?? 0) +
                                (stats?.disponibles ?? 0)}{" "}
                            números
                        </Text>
                    </View>

                    <View className="mt-4 h-3 overflow-hidden rounded-full bg-gray-700">
                        <View
                            className="h-full rounded-full bg-[#4F7CFF]"
                            style={{ width: `${porcentaje}%` }}
                        />
                    </View>
                </View>
            </View>

            {/* Números */}
            <View className="flex-row gap-4">

                {/* Vendidos */}
                <View className="flex-1 overflow-hidden rounded-2xl border border-gray-700 bg-[#1E2229]">
                    <View className="h-1 bg-[#4F7CFF]" />

                    <View className="p-5">
                        <View className="self-start flex-row items-center gap-2 rounded-full border border-[#4F7CFF]/30 bg-[#4F7CFF]/10 px-3 py-1.5">
                            <View className="h-2 w-2 rounded-full bg-[#4F7CFF]" />

                            <Text className="text-xs font-semibold text-[#4F7CFF]">
                                VENDIDOS
                            </Text>
                        </View>

                        <Text className="mt-3 text-4xl font-bold text-white">
                            {stats?.vendidos ?? 0}
                        </Text>

                        <Text className="mt-1 text-sm text-gray-500">
                            números vendidos
                        </Text>
                    </View>
                </View>

                {/* Disponibles */}
                <View className="flex-1 overflow-hidden rounded-2xl border border-gray-700 bg-[#1E2229]">
                    <View className="h-1 bg-[#22C55E]" />

                    <View className="p-5">
                        <View className="self-start flex-row items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1.5">
                            <View className="h-2 w-2 rounded-full bg-[#22C55E]" />

                            <Text className="text-xs font-semibold text-[#22C55E]">
                                RESTANTES
                            </Text>
                        </View>

                        <Text className="mt-3 text-4xl font-bold text-white">
                            {stats?.disponibles ?? 0}
                        </Text>

                        <Text className="mt-1 text-sm text-gray-500">
                            números restantes
                        </Text>
                    </View>
                </View>
            </View>

            {/* Dinero */}
            <View className="overflow-hidden rounded-2xl border border-gray-700 bg-[#1E2229]">
                <View className="h-1 bg-[#22C55E]" />

                <View className="p-5">
                    <View className="self-start flex-row items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1.5">
                        <View className="h-2 w-2 rounded-full bg-[#22C55E]" />

                        <Text className="text-xs font-semibold text-[#22C55E]">
                            DINERO
                        </Text>
                    </View>

                    <View className="mt-4 flex-row justify-between">

                        <View>
                            <Text className="text-sm text-gray-500">
                                Recaudado
                            </Text>

                            <Text className="mt-1 text-2xl font-bold text-[#22C55E]">
                                ${stats?.recaudado ?? 0}
                            </Text>
                        </View>

                        <View>
                            <Text className="text-sm text-gray-500">
                                Por recaudar
                            </Text>

                            <Text className="mt-1 text-2xl font-bold text-[#F59E0B]">
                                ${stats?.por_recaudar ?? 0}
                            </Text>
                        </View>

                    </View>
                </View>
            </View>

            {/* Total */}
            <View className="overflow-hidden rounded-2xl border border-gray-700 bg-[#1E2229]">
                <View className="h-1 bg-gray-500" />

                <View className="p-5">
                    <View className="self-start flex-row items-center gap-2 rounded-full border border-gray-600 bg-gray-700/30 px-3 py-1.5">
                        <View className="h-2 w-2 rounded-full bg-gray-400" />

                        <Text className="text-xs font-semibold text-gray-300">
                            TOTAL ESPERADO
                        </Text>
                    </View>

                    <Text className="mt-3 text-3xl font-bold text-white">
                        ${stats?.total_esperado ?? 0}
                    </Text>
                </View>
            </View>

        </View>
    );
}


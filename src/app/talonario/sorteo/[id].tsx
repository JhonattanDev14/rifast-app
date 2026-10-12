import { useLocalSearchParams } from "expo-router";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dices, Sparkles } from "lucide-react-native";
import { useState, useEffect } from "react";
import {
    getCandidatosSorteo,
    getGanadores,
} from "@/features/ventas/services/ventaService";

import { ejecutarSorteo } from "@/features/ventas/services/sorteoService";
import { getTalonarioById } from "@/features/talonarios/services/talonariosService";

import AppModal from "@/components/ui/AppModal";
import Toast from "react-native-toast-message";
import { alert } from "@/utils/alert";
import GanadoresContent from "@/features/ventas/components/ganadoresContent";
import GanadorScreen from "@/features/ventas/components/ganadorScreen";
import ConfirmarSorteoContent from "@/features/ventas/components/confirmarSorteoContent";

export default function SorteoScreen() {
    const [modal, setModal] = useState<{ title: string; content: React.ReactNode; } | null>(null);
    const [talonario, setTalonario] = useState<{nombre: string; cantidad_ganadores: number | 0; } | null>(null);
    const { id } = useLocalSearchParams<{ id: string }>();

    const [ganadores, setGanadores] = useState<
        {
            numero: number;
            comprador: string;
            telefono: string;
            fecha: string;
        }[]
    >([]);

    const [ganador, setGanador] = useState<{
        numero: number;
        comprador: string;
        telefono: string;
    } | null>(null);

    const [cantidadParticipantes, setCantidadParticipantes] = useState(0);

    useEffect(() => {
        const talonarioData = getTalonarioById(Number(id));
        const candidatos = getCandidatosSorteo(Number(id));
        const sorteados = getGanadores(Number(id));

        setTalonario(talonarioData);
        setCantidadParticipantes(candidatos.length);
        setGanadores(sorteados);
    }, [id]);

    return (
        <>
        
            <View className="flex-1 bg-neutral-950 px-5 pt-6">

                {/* Encabezado */}
                <View className="mb-8">
                    <Text className="text-3xl font-bold text-white text-center">
                        {talonario?.nombre ?? "Sorteo"}
                    </Text>

                    <Text className="mt-1 text-base text-neutral-400 text-center">
                        Selecciona un ganador
                    </Text>
                </View>

               {/* Cantidad de ganadores */}
                <View className="mb-5">
                    <Text className="mb-2 text-sm font-semibold text-neutral-400 text-center">
                        CANTIDAD DE GANADORES
                    </Text>

                    <View className="flex-row items-center justify-between rounded-2xl border border-indigo-500/20 bg-neutral-900 px-5 py-4">
                        <Text className="text-base font-medium text-neutral-400">
                            Ganadores para esta rifa
                        </Text>

                        <Text className="text-3xl font-black text-white">
                            {talonario?.cantidad_ganadores ?? 0}
                        </Text>
                    </View>
                </View>

                {/* Números disponibles */}
                <LinearGradient
                    colors={["#050505", "#17133D", "#312E81"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        marginBottom: 24,
                        borderRadius: 24,
                        overflow: "hidden",
                        borderWidth: 1,
                        borderColor: "rgba(99, 102, 241, 0.3)",
                    }}
                >
                    <View className="items-center px-6 py-8">

                        <View className="mb-3 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-1">
                            <Text className="text-xs font-bold tracking-widest text-indigo-300">
                                NÚMEROS DISPONIBLES
                            </Text>
                        </View>

                        <Text className="text-7xl font-black text-white">
                            <Text className="text-7xl font-black text-white">
                                {cantidadParticipantes}
                            </Text>
                        </Text>

                        <Text className="mt-1 text-sm font-medium text-indigo-200/60">
                            números listos para participar
                        </Text>

                    </View>
                </LinearGradient>

                {/* Botón sortear */}
                <LinearGradient
                    colors={["#6D4AFF","#2563EB","#06B6D4",]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="rounded-2xl"
                    style={{
                        borderRadius: 24,
                        marginBottom: 24,
                        overflow: "hidden",
                    }}
                >
                    <Pressable
                        onPress={() => {
                            if (ganadores.length >= (talonario?.cantidad_ganadores ?? 0)) {
                                alert.error("Ya se sortearon todos los números");
                                return;
                            }

                            const realizarSorteo = () => {
                                try {
                                    const resultado = ejecutarSorteo(Number(id));
                                    setGanador(resultado);
                                    setGanadores(getGanadores(Number(id)));
                                    setCantidadParticipantes(getCandidatosSorteo(Number(id)).length);
                                    setModal(null);
                                    setModal({
                                        title: 'Ganador',
                                        content: (
                                            <GanadorScreen 
                                                ganador={resultado}
                                                onClose={() => setModal(null)}
                                                />
                                            )
                                    })
                                } catch (error) {
                                    const mensaje =
                                        error instanceof Error
                                            ? error.message
                                            : "Ocurrió un error inesperado.";

                                    alert.error(mensaje, 100);
                                }
                            };

                            if (ganadores.length === 0) {
                                setModal({
                                    title: "⚠️ Confirmar sorteo",
                                    content: (
                                        <ConfirmarSorteoContent
                                            onCancel={() => setModal(null)}
                                            onConfirm={realizarSorteo}
                                        />
                                    ),
                                });

                                return;
                            }

                            realizarSorteo();
                        }}

                        
                        className="items-center py-5 active:opacity-80"
                    >
                        <Dices size={30} color="white" />

                        <Text className="mt-2 text-lg font-bold tracking-wide text-white">
                            SORTEAR
                        </Text>
                    </Pressable>
                </LinearGradient>

                {ganadores.length > 0 && (
                    <LinearGradient
                        colors={["#FFB347", "#FF7A3D"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                            borderRadius: 24,
                            overflow: "hidden",
                        }}
                    >
                        <Pressable
                            className="h-14 flex-row items-center justify-center gap-2 rounded-2xl"
                            onPress={() => {
                                setModal({
                                    title: "🏆 Ganadores",
                                    content: (
                                        <GanadoresContent
                                            ganadores={getGanadores(Number(id))}
                                        />
                                    ),
                                });
                            }}
                        >
                            <Sparkles size={20} color="#FFFFFF" />
                            <Text className="text-white font-bold">
                                MOSTRAR GANADORES
                            </Text>
                        </Pressable>
                    </LinearGradient>
                )}
                    

            </View>

            <AppModal
                visible={modal !== null}
                title={modal?.title ?? ""}
                onClose={() => setModal(null)}
            >
                {modal?.content}
            </AppModal>

            <Toast />
        </>
    );
}
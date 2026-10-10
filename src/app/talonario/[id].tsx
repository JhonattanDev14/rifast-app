import { Pressable, Text, TextInput, View } from "react-native";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { Plus, Search, Settings } from "lucide-react-native";
import { useState, useCallback } from "react";
import { alert } from "@/utils/alert";

// UI
import CreateVentaForm from "@/components/forms/CreateVentaForm";
import DataTable from "@/components/ui/DataTable";
import AppModal from "@/components/ui/AppModal";
import RifaHeader from "@/components/ui/RifaHeader";
import RifaOptionsMenu from "@/components/ui/RifaOptionsMenu";

// FUNCTIONS
import { getTalonarioById } from "@/features/talonarios/services/talonariosService";
import { generarTicket } from "@/features/ventas/services/ticketService";

import {
    getVentas,
    createVenta,
    getEstadosVenta,
    updateVenta,
} from "@/features/ventas/services/ventaService";

import type { Venta } from "@/types/venta";

export default function TalonarioScreen() {
    const { id } = useLocalSearchParams();

    const [talonario, setTalonario] = useState(
        () => getTalonarioById(Number(id))
    );

    const [ventas, setVentas] = useState(() => getVentas(Number(id)));
    const [busqueda, setBusqueda] = useState("");
    const [ventaSeleccionada, setVentaSeleccionada] =
        useState<Venta | null>(null);
    const [estados, setEstados] = useState(getEstadosVenta());

    const [modal, setModal] = useState<{
        title: string;
        content: React.ReactNode;
    } | null>(null);

    useFocusEffect(
        useCallback(() => {
            setTalonario(getTalonarioById(Number(id)));
            setVentas(getVentas(Number(id)));
            setEstados(getEstadosVenta());
        }, [id])
    );

    const finalizada = talonario
        ? new Date(talonario.fecha).getTime() < Date.now()
        : false;

    const ventasFiltradas = ventas.filter((venta) => {
        const texto = busqueda.toLowerCase();

        return (
            venta.comprador.toLowerCase().includes(texto) ||
            venta.numeros.toLowerCase().includes(texto)
        );
    });

    return (
        <>
        <View className="bg-[#171A1F] flex-1 pt-4">
            <RifaHeader talonario={talonario} />
            <View className="mb-2 flex-row items-center gap-3 p-3 ">
                <Pressable
                    disabled={finalizada}
                    onPress={() =>
                        setModal({
                            title: "Agregar venta",
                            content: (
                                <CreateVentaForm
                                    disabled={finalizada}
                                    venta={ventaSeleccionada}
                                    estados={estados}
                                    onSubmit={(data) => {
                                        try {
                                            createVenta(Number(id), data);

                                            setModal(null);
                                            setVentas(getVentas(Number(id)));

                                            alert.success("Registrado", 100);
                                        } catch (error) {
                                            alert.error(
                                                (error as Error).message,
                                                100
                                            );
                                        }
                                    }}
                                />
                            ),
                        })
                    }
                    className={`h-14 w-14 items-center justify-center rounded-2xl ${
                        finalizada
                            ? "bg-gray-700 opacity-50"
                            : "bg-[#4F7CFF]"
                    }`}
                >
                    <Plus size={24} color="white" />
                </Pressable>

                <View className="h-14 flex-1 flex-row items-center rounded-2xl border border-gray-700 bg-[#1E2229] px-4">
                    <Search size={20} color="#9CA3AF" />

                    <TextInput
                        className="ml-3 flex-1 text-base text-white"
                        placeholder="Buscar por nombre o número"
                        placeholderTextColor="#6B7280"
                        value={busqueda}
                        onChangeText={setBusqueda}
                    />
                </View>

                <Pressable
                    onPress={() =>
                        setModal({
                            title: "Opciones del talonario",
                            content: (
                                <RifaOptionsMenu
                                    onStatsPress={() => {
                                        router.push(`/talonario/stats/${id}`);
                                        setModal(null);
                                    }}
                                    onDrawPress={() => {
                                        router.push(`/talonario/sorteo/${id}`);
                                        setModal(null);
                                    }}
                                />
                            ),
                        })
                    }
                    className="h-14 w-14 items-center justify-center rounded-2xl border border-gray-700 bg-[#1E2229]"
                >
                    <Settings size={22} color="#9CA3AF" />
                </Pressable>

                <AppModal
                    visible={modal !== null}
                    title={modal?.title ?? ""}
                    onClose={() => setModal(null)}
                >
                    {modal?.content}
                </AppModal>
            </View>

            <View className="flex-1">
                <DataTable
                    columns={[
                        { key: "estado", label: "Estado" },
                        { key: "numeros", label: "Numeros" },
                        { key: "comprador", label: "Comprador" },
                        { key: "telefono", label: "Teléfono" },
                        { key: "fecha", label: "Fecha" },
                    ]}
                    data={ventasFiltradas}
                    onRowPress={(venta) => {
                        setModal({
                            title: "Editar venta",
                            content: (
                                <View>
                                    <CreateVentaForm
                                        disabled={finalizada}
                                        venta={venta}
                                        estados={estados}
                                        onSubmit={(data) => {
                                            try {
                                                updateVenta(
                                                    Number(id),
                                                    venta.id,
                                                    data
                                                );

                                                setVentas(getVentas(Number(id)));
                                                setModal(null);

                                                alert.success(
                                                    "Actualizacion hecha",
                                                    100
                                                );
                                            } catch (error) {
                                                alert.error(
                                                    (error as Error).message,
                                                    100
                                                );
                                            }
                                        }}
                                    />

                                    <Pressable
                                        onPress={() =>
                                            generarTicket(
                                                venta,
                                                estados,
                                                talonario.id
                                            )
                                        }
                                        className="mt-3 rounded-xl bg-[#22C55E] py-4"
                                    >
                                        <Text className="text-center font-semibold text-white">
                                            Generar ticket
                                        </Text>
                                    </Pressable>
                                </View>
                            ),
                        });
                    }}
                />
            </View>
        </View>
        </>
    );
}

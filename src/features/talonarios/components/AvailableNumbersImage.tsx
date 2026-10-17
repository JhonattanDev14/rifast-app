
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    View,
    useWindowDimensions,
} from "react-native";
import {
    ChevronLeft,
    ChevronRight,
    Ticket,
} from "lucide-react-native";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { alert } from "@/utils/alert";

type Props = {
    nombre: string;
    precio: number;
    total: number;
    disponibles: number[];
};

export default function AvailableNumbersImage({
    nombre,
    precio,
    total,
    disponibles,
}: Props) {
    const [pagina, setPagina] = useState(0);
    const imagenRef = useRef<any>(null);
    const { width: anchoPantalla } = useWindowDimensions();

    // La imagen conserva un ancho amplio aunque el modal sea estrecho.
    const anchoImagen = Math.max(anchoPantalla - 32, 460);

    const numerosPorPagina = 100;

    const totalPaginas = Math.ceil(
        disponibles.length / numerosPorPagina
    );

    const numerosPagina = disponibles.slice(
        pagina * numerosPorPagina,
        (pagina + 1) * numerosPorPagina
    );

    const compartirImagen = async () => {
        try {
            if (!imagenRef.current) {
                throw new Error("ViewShot no está disponible");
            }

            const uri = await imagenRef.current.capture();

            if (!uri) {
                throw new Error("No se generó la imagen");
            }

            if (!(await Sharing.isAvailableAsync())) {
                alert.error("Compartir no está disponible");
                return;
            }

            await Sharing.shareAsync(uri, {
                mimeType: "image/png",
                dialogTitle: "Compartir números disponibles",
            });
        } catch (error) {
            console.error("Error al compartir imagen:", error);
            alert.error("No se pudo compartir la imagen");
        }
    };

    return (
        <View style={{ width: "100%" }}>
            {/* Imagen desplazable dentro del modal */}
            <ScrollView
                horizontal
                style={{ width: "100%" }}
                contentContainerStyle={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    alignItems: "flex-start",
                }}
                >
                <View  onStartShouldSetResponder={() => true}>
                <ViewShot
                    ref={imagenRef}
                    style={{ width: anchoImagen }}
                    options={{
                        format: "png",
                        quality: 1,
                        result: "tmpfile",
                    }}
                >
                    <View
                        collapsable={false}
                        style={{
                            width: "100%",
                            backgroundColor: "#111827",
                            borderRadius: 28,
                            paddingHorizontal: 30,
                            paddingVertical: 32,
                            borderWidth: 1,
                            borderColor: "#303D59",
                        }}
                    >
                        {/* Encabezado centrado */}
                        <View
                            style={{
                                alignItems: "center",
                                marginBottom: 30,
                            }}
                        >
                            <LinearGradient
                                colors={["#5278FF", "#6548D9"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={{
                                    width: 58,
                                    height: 58,
                                    borderRadius: 19,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 14,
                                }}
                            >
                                <Ticket color="#FFFFFF" size={30} />
                            </LinearGradient>

                            <Text
                                style={{
                                    color: "#91AFFF",
                                    fontSize: 12,
                                    fontWeight: "900",
                                    letterSpacing: 5,
                                    marginBottom: 12,
                                }}
                            >
                                RIFAST
                            </Text>

                            <Text
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: 30,
                                    lineHeight: 38,
                                    fontWeight: "900",
                                    textAlign: "center",
                                    width: "100%",
                                }}
                            >
                                {nombre}
                            </Text>

                            <View
                                style={{
                                    width: 64,
                                    height: 4,
                                    borderRadius: 4,
                                    backgroundColor: "#587BFF",
                                    marginTop: 18,
                                    marginBottom: 16,
                                }}
                            />

                            <Text
                                style={{
                                    color: "#B8C5DF",
                                    fontSize: 14,
                                    textAlign: "center",
                                }}
                            >
                                Elige tu número de la suerte
                            </Text>

                            <Text
                                style={{
                                    color: "#91B4FF",
                                    fontSize: 13,
                                    fontWeight: "600",
                                    marginTop: 10,
                                }}
                            >
                                ${precio.toLocaleString("es-CO")} por número
                            </Text>
                        </View>

                        {/* Separador */}
                        <View
                            style={{
                                height: 1,
                                backgroundColor: "#303D59",
                                marginBottom: 24,
                            }}
                        />

                        {/* Números disponibles */}
                        {numerosPagina.length > 0 ? (
                            <View
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    columnGap: 8,
                                    rowGap: 10,
                                }}
                            >
                                {numerosPagina.map((numero) => (
                                    <View
                                        key={numero}
                                        style={{
                                            width: 42,
                                            height: 38,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 10,
                                            backgroundColor: "#202B40",
                                            borderWidth: 1,
                                            borderColor: "#394967",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "#E5ECFF",
                                                fontSize: 12,
                                                fontWeight: "800",
                                            }}
                                        >
                                            {numero}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <View
                                style={{
                                    alignItems: "center",
                                    borderRadius: 16,
                                    backgroundColor: "#1D2638",
                                    padding: 24,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#AAB4CC",
                                        textAlign: "center",
                                        fontWeight: "600",
                                    }}
                                >
                                    No quedan números disponibles
                                </Text>
                            </View>
                        )}

                        {/* Llamada a la acción */}
                        <LinearGradient
                            colors={["#4568E8", "#6548D9"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{
                                marginTop: 30,
                                borderRadius: 16,
                                paddingVertical: 19,
                                paddingHorizontal: 16,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: 19,
                                    fontWeight: "900",
                                }}
                            >
                                ¡Reserva el tuyo!
                            </Text>

                            <Text
                                style={{
                                    color: "#E1E9FF",
                                    fontSize: 13,
                                    marginTop: 6,
                                }}
                            >
                                Elige tu número favorito
                            </Text>
                        </LinearGradient>

                        <Text
                            style={{
                                color: "#74819B",
                                fontSize: 11,
                                textAlign: "center",
                                marginTop: 22,
                            }}
                        >
                            Comparte esta rifa con tus amigos
                        </Text>
                    </View>
                </ViewShot>
            </View>
            </ScrollView>

            {/* Paginación */}
            <View
                style={{
                    marginTop: 16,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 12,
                }}
            >
                <Pressable
                    disabled={pagina === 0}
                    onPress={() =>
                        setPagina((actual) => actual - 1)
                    }
                    style={{
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: "#35415A",
                        backgroundColor: "#202B40",
                        padding: 12,
                        opacity: pagina === 0 ? 0.35 : 1,
                    }}
                >
                    <ChevronLeft color="#FFFFFF" size={22} />
                </Pressable>

                <Text
                    style={{
                        color: "#FFFFFF",
                        fontWeight: "700",
                    }}
                >
                    Página {pagina + 1} de {Math.max(totalPaginas, 1)}
                </Text>

                <Pressable
                    disabled={pagina >= totalPaginas - 1}
                    onPress={() =>
                        setPagina((actual) => actual + 1)
                    }
                    style={{
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: "#35415A",
                        backgroundColor: "#202B40",
                        padding: 12,
                        opacity:
                            pagina >= totalPaginas - 1 ? 0.35 : 1,
                    }}
                >
                    <ChevronRight color="#FFFFFF" size={22} />
                </Pressable>
            </View>

            {/* Compartir imagen */}
            <Pressable
                onPress={compartirImagen}
                style={{
                    marginTop: 16,
                    alignItems: "center",
                    borderRadius: 14,
                    backgroundColor: "#4568E8",
                    padding: 16,
                }}
            >
                <Text
                    style={{
                        color: "#FFFFFF",
                        fontWeight: "800",
                        fontSize: 15,
                    }}
                >
                    Compartir esta página
                </Text>
            </Pressable>
        </View>
    );
}


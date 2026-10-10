
import { View, Text, Linking, Pressable } from "react-native";
import { Trophy, MessageCircle } from "lucide-react-native";

type Ganador = {
    numero: number;
    comprador: string;
    telefono: number;
};

type Props = {
    ganadores: Ganador[];
};

export default function GanadoresContent({ ganadores }: Props) {

    const abrirWhatsApp = (telefono: number) => {
        const numero = String(telefono).replace(/\D/g, "");
        const numeroWhatsApp = numero.startsWith("57")
            ? numero
            : `57${numero}`;

        Linking.openURL(`https://wa.me/${numeroWhatsApp}`);
    };


    return (
        <View className="gap-4">
            {ganadores.map((ganador, index) => (
                <View
                    key={ganador.numero}
                    className="overflow-hidden rounded-3xl border border-amber-400/20 bg-[#1B1F26]"
                >
                    {/* Brillo superior */}
                    <View className="h-1 bg-amber-400" />

                    <View className="p-5">

                        {/* Badge ganador */}
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-3">
                                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/10 border border-amber-400/20">
                                    <Trophy
                                        size={24}
                                        color="#FFB347"
                                    />
                                </View>

                                <View>
                                    <Text className="text-[11px] font-bold tracking-[2px] text-amber-400">
                                        GANADOR
                                    </Text>

                                    <Text className="mt-0.5 text-sm font-semibold text-neutral-400">
                                        Premio #{index + 1}
                                    </Text>
                                </View>
                            </View>

                            <View className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1">
                                <Text className="text-xs font-bold text-amber-400">
                                    #{index + 1}
                                </Text>
                            </View>
                        </View>

                        {/* Número */}
                        <View className="mt-6 items-center rounded-2xl bg-[#14171C] py-6 border border-neutral-800">
                            <Text className="text-[10px] font-bold tracking-[3px] text-neutral-500">
                                NÚMERO PREMIADO
                            </Text>

                            <Text className="mt-1 text-6xl font-black tracking-tight text-white">
                                #{String(ganador.numero).padStart(3, "0")}
                            </Text>
                        </View>

                        {/* Separador */}
                        <View className="my-5 h-px bg-neutral-800" />

                        {/* Comprador */}
                        <View>
                            <Text className="text-[10px] font-bold tracking-[2px] text-neutral-500">
                                GANADOR
                            </Text>

                            <Text className="mt-1 text-lg font-bold text-white">
                                {ganador.comprador}
                            </Text>

                            <Text className="mt-1 text-sm text-neutral-400">
                                {ganador.telefono}
                            </Text>
                        </View>

                        {/* WhatsApp */}
                        <Pressable
                            onPress={() => abrirWhatsApp(ganador.telefono)}
                            className="mt-5 h-12 flex-row items-center justify-center gap-2 rounded-2xl bg-[#25D366]"
                        >
                            <MessageCircle
                                size={20}
                                color="#FFFFFF"
                            />

                            <Text className="font-bold text-white">
                                CONTACTAR POR WHATSAPP
                            </Text>
                        </Pressable>

                    </View>
                </View>
            ))}
        </View>
    );
}


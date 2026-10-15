
import { Pressable, Text, View } from 'react-native';
import { ArrowRight, ShieldCheck, UserRound } from 'lucide-react-native';

type GoogleConnectModalProps = {
    cargando: boolean;
    onConectar: () => void;
    onContinuarSinCuenta: () => void;
};

export default function GoogleConnectModal({
    cargando,
    onConectar,
    onContinuarSinCuenta,
}: GoogleConnectModalProps) {
    return (
        <>
            <View className="items-center pb-5">
                <View className="mb-4 h-20 w-20 items-center justify-center rounded-full border border-[#4F7CFF]/40 bg-[#171D35]">
                    <ShieldCheck size={42} color="#64D8FF" />
                </View>

                <Text className="text-center text-base leading-6 text-gray-300">
                    Conecta tu cuenta de Google para guardar copias de seguridad de tus rifas en Drive y reducir el riesgo de perder tus datos.
                </Text>
            </View>

            <Pressable
                disabled={cargando}
                onPress={onConectar}
                className="flex-row items-center justify-center rounded-xl border border-[#829BFF] bg-[#E5EDFF] p-4"
                style={{ opacity: cargando ? 0.6 : 1 }}
            >
                <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-white">
                    <Text className="text-xl font-extrabold text-[#4285F4]">
                        G
                    </Text>
                </View>

                <Text className="font-bold text-[#202D55]">
                    {cargando ? 'Conectando...' : 'Conectar con Google'}
                </Text>

                {!cargando && (
                    <ArrowRight
                        size={19}
                        color="#4057A8"
                        style={{ marginLeft: 10 }}
                    />
                )}
            </Pressable>

            <Pressable
                disabled={cargando}
                onPress={onContinuarSinCuenta}
                className="mt-3 flex-row items-center justify-center rounded-xl border border-[#3B6FEA] bg-[#172B50] p-4"
                style={{ opacity: cargando ? 0.6 : 1 }}
            >
                <UserRound size={19} color="#8AB4FF" />

                <Text className="ml-3 font-semibold text-[#D6E5FF]">
                    Continuar sin cuenta
                </Text>

                <ArrowRight
                    size={18}
                    color="#8AB4FF"
                    style={{ marginLeft: 10 }}
                />
            </Pressable>
        </>
    );
}

import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import {
    ArrowRight,
    ShieldCheck,
    CloudUpload,
} from 'lucide-react-native';

import GoogleConnectModal from '@/features/backup/components/GoogleConnectModal';
import GoogleConnectedModal from '@/features/backup/components/GoogleConnectedModal';
import { useGoogleAuth } from '@/features/backup/hooks/useGoogleAuth';
import AppModal from '@/components/ui/AppModal';

export default function Home() {
    const [modal, setModal] = useState<{
        title: string;
        content: React.ReactNode;
    } | null>(null);

    const { usuarioGoogle, cargando, conectar } = useGoogleAuth();

    function mostrarModalInicial() {
        setModal({
            title: 'Protege tus datos',
            content: (
                <GoogleConnectModal
                    cargando={cargando}
                    onConectar={conectarGoogle}
                    onContinuarSinCuenta={continuarSinCuenta}
                />
            ),
        });
    }

    function mostrarModalConectado(usuario: NonNullable<typeof usuarioGoogle>) {
        setModal({
            title: '¡Google conectado!',
            content: (
                <GoogleConnectedModal
                    email={usuario.user.email}
                    onContinuar={() => {
                        setModal(null);
                        router.push('/dashboard');
                    }}
                />
            ),
        });
    }

    async function conectarGoogle() {
        try {
            const usuario = await conectar();

            if (usuario) {
                mostrarModalConectado(usuario);
            }
        } catch (error) {
            console.error('Error al conectar Google:', error);

            const mensaje = error instanceof Error
                ? error.message
                : String(error);

            mostrarModalInicial();
            // Mostrar error mediante el sistema de alertas de la app.
        }
    }

    function continuarSinCuenta() {
        setModal(null);
        router.push('/dashboard');
    }
    
    return (
        <View className="flex-1 items-center justify-center bg-[#10121A] px-6">
            <View className="mb-5 h-20 w-20 items-center justify-center rounded-3xl border border-[#4F7CFF]/40 bg-[#171D35]">
                <CloudUpload size={42} color="#64D8FF" />
            </View>

            <Text className="text-5xl font-extrabold text-[#6A7DFF]">
                Rifast
            </Text>

            <Text className="mt-3 text-center text-base text-gray-400">
                Organiza tus rifas de forma rápida y sencilla.
            </Text>

            <View className="mt-12 w-full">
                <Pressable
                    onPress={mostrarModalInicial}
                    className="flex-row items-center justify-center rounded-2xl bg-[#344FE0] px-6 py-5"
                >
                    <Text className="text-lg font-bold text-white">
                        Iniciar
                    </Text>

                    <ArrowRight
                        size={21}
                        color="white"
                        style={{ marginLeft: 12 }}
                    />
                </Pressable>
            </View>

            <View className="mt-8 flex-row items-center">
                <ShieldCheck size={17} color="#6576C8" />

                <Text className="ml-2 text-sm text-gray-500">
                    Tus rifas, siempre contigo
                </Text>
            </View>

            <AppModal
                visible={modal !== null}
                title={modal?.title ?? ''}
                onClose={() => setModal(null)}
            >
                {modal?.content}
            </AppModal>
        </View>
    );
}


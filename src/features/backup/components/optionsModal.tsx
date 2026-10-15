
import { Pressable, Text, View } from 'react-native';
import { CloudUpload, CloudDownload, ChevronRight } from 'lucide-react-native';
import BackupList from "@/features/backup/components/backUpList";
import { useState } from 'react';


type Backup = {
    id: string;
    name: string;
    modifiedTime: string;
    size: string;
};

type BackupOptionsModalProps = {
    googleConectado: boolean;
    subiendo: boolean;
    onSubir: () => void;
    onCargar: () => void;
};


export default function BackupOptionsModal({
    googleConectado,
    subiendo,
    onSubir,
    onCargar,
}: BackupOptionsModalProps) {
    return (
        <View className="gap-4">
            <Text className="mb-1 text-center text-sm leading-5 text-gray-400">
                Protege tus rifas o recupera tus datos desde Google Drive.
            </Text>

            <Pressable
                disabled={!googleConectado}
                onPress={onSubir}
                className="flex-row items-center rounded-2xl border border-[#39FF88]/30 bg-[#163329] p-4"
                style={{ opacity: googleConectado ? 1 : 0.5 }}
            >
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-[#224A37]">
                    <CloudUpload size={25} color="#39FF88" />
                </View>

                <View className="flex-1">
                    <Text className="text-base font-bold text-[#39FF88]">
                        {subiendo ? 'Creando copia...' : 'Subir copia'}
                    </Text>
                    <Text className="mt-1 text-sm leading-5 text-gray-300">
                        Guardar tus rifas en Google Drive.
                    </Text>
                </View>

                <ChevronRight size={22} color="#39FF88" />
            </Pressable>

            <Pressable
                disabled={!googleConectado}
                onPress={onCargar}
                className="flex-row items-center rounded-2xl border border-[#4F7CFF]/40 bg-[#192744] p-4"
                style={{ opacity: googleConectado ? 1 : 0.5 }}
            >
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-[#253B65]">
                    <CloudDownload size={25} color="#64D8FF" />
                </View>

                <View className="flex-1">
                    <Text className="text-base font-bold text-[#64D8FF]">
                        Cargar copia
                    </Text>
                    <Text className="mt-1 text-sm leading-5 text-gray-300">
                        Recuperar tus datos desde Drive.
                    </Text>
                </View>

                <ChevronRight size={22} color="#64D8FF" />
            </Pressable>

            {!googleConectado && (
                <Text className="text-center text-xs text-gray-500">
                    Conecta tu cuenta de Google para habilitar estas opciones.
                </Text>
            )}
        </View>
    );
}

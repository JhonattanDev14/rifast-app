
import { Pressable, Text, View } from 'react-native';
import {
    Database,
    CalendarClock,
    HardDrive,
    ChevronRight,
} from 'lucide-react-native';

type Backup = {
    id: string;
    name: string;
    modifiedTime: string;
    size: string;
};

type BackupListProps = {
    backups: Backup[];
    onSelect: (backup: Backup) => void;
};

export default function BackupList({
    backups,
    onSelect,
}: BackupListProps) {
    const formatSize = (size: string) => {
        const bytes = Number(size);

        if (!Number.isFinite(bytes) || bytes < 0) return 'Tamaño desconocido';

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const formatDate = (date: string) => {
        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return 'Fecha desconocida';
        }

        return parsedDate.toLocaleString('es-CO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (backups.length === 0) {
        return (
            <View className="items-center rounded-2xl border border-[#343B48] bg-[#171A1F] px-5 py-8">
                <Database size={36} color="#64D8FF" />

                <Text className="mt-3 text-base font-bold text-white">
                    No hay copias disponibles
                </Text>

                <Text className="mt-2 text-center text-sm leading-5 text-gray-400">
                    Cuando tengas backups en Google Drive, aparecerán aquí.
                </Text>
            </View>
        );
    }

    return (
        <View className="gap-3">
            <View className="mb-1 flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-300">
                    Copias disponibles
                </Text>

                <View className="rounded-full border border-[#4F7CFF]/30 bg-[#192744] px-3 py-1">
                    <Text className="text-xs font-bold text-[#64D8FF]">
                        {backups.length} {backups.length === 1 ? 'copia' : 'copias'}
                    </Text>
                </View>
            </View>

            {backups.map((backup) => (
                <Pressable
                    key={backup.id}
                    onPress={() => onSelect(backup)}
                    accessibilityRole="button"
                    accessibilityLabel={`Seleccionar copia ${backup.name}`}
                    className="overflow-hidden rounded-2xl border border-[#344867] bg-[#1A202B] active:bg-[#222E40]"
                >
                    <View className="h-1 bg-[#4F7CFF]" />

                    <View className="flex-row items-center p-4">
                        <View className="mr-3 h-12 w-12 items-center justify-center rounded-xl border border-[#64D8FF]/20 bg-[#193247]">
                            <Database size={24} color="#64D8FF" />
                        </View>

                        <View className="flex-1">
                            <Text
                                numberOfLines={2}
                                className="text-sm font-bold leading-5 text-white"
                            >
                                Copia de seguridad
                            </Text>

                            <Text
                                numberOfLines={2}
                                className="mt-1 text-xs leading-4 text-gray-400"
                            >
                                {backup.name}
                            </Text>

                            <View className="mt-3 flex-row flex-wrap items-center gap-x-3 gap-y-2">
                                <View className="flex-row items-center">
                                    <CalendarClock
                                        size={13}
                                        color="#64D8FF"
                                    />
                                    <Text className="ml-1.5 text-xs text-gray-300">
                                        {formatDate(backup.modifiedTime)}
                                    </Text>
                                </View>

                                <View className="flex-row items-center">
                                    <HardDrive
                                        size={13}
                                        color="#39FF88"
                                    />
                                    <Text className="ml-1.5 text-xs text-gray-300">
                                        {formatSize(backup.size)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="ml-2 h-9 w-9 items-center justify-center rounded-full bg-[#253B65]">
                            <ChevronRight size={21} color="#64D8FF" />
                        </View>
                    </View>
                </Pressable>
            ))}

            <Text className="mt-1 text-center text-xs leading-5 text-gray-500">
                Selecciona una copia para continuar.
            </Text>
        </View>
    );
}

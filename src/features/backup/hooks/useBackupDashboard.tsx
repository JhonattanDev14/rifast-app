
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Alert, Text } from 'react-native';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

import BackupOptionsModal from '@/features/backup/components/optionsModal';
import BackupList from '@/features/backup/components/backUpList';
import { useBackup } from '@/features/backup/hooks/useBackup';
import { obtenerUsuarioGoogle } from '@/features/backup/services/googleAuthService';
import { alert } from '@/utils/alert';

export type BackupDashboardModalState = {
    title: string;
    content: ReactNode;
};

type Backup = {
    id: string;
    name: string;
    modifiedTime: string;
    size: string;
    mimeType?: string;
};

type Props = {
    setModal: Dispatch<
        SetStateAction<BackupDashboardModalState | null>
    >;
    actualizarTalonarios: () => void;
};

export function useBackupDashboard({
    setModal,
    actualizarTalonarios,
}: Props) {
    const [googleConectado, setGoogleConectado] = useState(
        () => !!obtenerUsuarioGoogle()
    );

    const restauracionEnCurso = useRef(false);

    const {
        subiendo,
        subirCopia,
        restaurando,
        restaurarCopia,
        buscarCopias,
    } = useBackup();

    useFocusEffect(
        useCallback(() => {
            setGoogleConectado(!!obtenerUsuarioGoogle());
        }, [])
    );

    async function cargarCopias() {
        try {
            const archivos = await buscarCopias();

            if (archivos.length === 0) {
                alert.error(
                    'No se encontraron copias en Google Drive.'
                );
                return;
            }

            setModal({
                title: 'Seleccionar copia de seguridad',
                content: (
                    <BackupList
                        backups={archivos}
                        onSelect={confirmarRestauracion}
                    />
                ),
            });
        } catch (error) {
            alert.error(
                error instanceof Error
                    ? error.message
                    : 'No se pudieron buscar las copias de seguridad.'
            );
        }
    }

    function confirmarRestauracion(backup: Backup) {
        if (restaurando || restauracionEnCurso.current) {
            return;
        }

        Alert.alert(
            'Restaurar copia de seguridad',
            `Se reemplazarán los datos actuales por la copia "${backup.name}". ¿Deseas continuar?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Restaurar',
                    style: 'destructive',
                    onPress: () => void ejecutarRestauracion(backup),
                },
            ]
        );
    }

    async function ejecutarRestauracion(backup: Backup) {
        if (restauracionEnCurso.current) {
            return;
        }

        restauracionEnCurso.current = true;

        try {
            const resultado = await restaurarCopia(backup.id);

            if (!resultado) {
                throw new Error(
                    'No se pudo completar la restauración.'
                );
            }

            actualizarTalonarios();

            setModal({
                title: 'Restauración completada',
                content: (
                    <Text className="text-white">
                        La copia de seguridad se restauró correctamente.
                    </Text>
                ),
            });
        } catch (error) {
            alert.error(
                error instanceof Error
                    ? error.message
                    : 'No se pudo restaurar la copia de seguridad.'
            );
        } finally {
            restauracionEnCurso.current = false;
        }
    }

    async function manejarSubidaBackup() {
        try {
            await subirCopia();
            alert.success('Copia guardada en Google Drive');
        } catch (error) {
            alert.error(
                error instanceof Error
                    ? error.message
                    : 'No se pudo crear la copia de seguridad.'
            );
        }
    }

    function abrirModalBackup() {
        setModal({
            title: 'Copia de seguridad',
            content: (
                <BackupOptionsModal
                    googleConectado={googleConectado}
                    subiendo={subiendo}
                    onSubir={manejarSubidaBackup}
                    onCargar={cargarCopias}
                />
            ),
        });
    }

    return { abrirModalBackup };
}

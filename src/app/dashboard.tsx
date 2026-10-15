
import { useFocusEffect } from 'expo-router';
import { CloudUpload, Plus } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import type { ReactNode } from 'react';

import CreateTalonarioForm from '@/components/forms/CreateTalonarioForm';
import AppModal from '@/components/ui/AppModal';
import {
    useBackupDashboard,
    type BackupDashboardModalState,
} from '@/features/backup/hooks/useBackupDashboard';

import {
    createTalonario,
    getTalonarios,
    updateTalonario,
} from '@/features/talonarios/services/talonariosService';
import { alert } from '@/utils/alert';

import TalonarioList from '../components/list/talonarioList';
import type { Talonario } from '../types/talonario';

type ModalState = {
    title: string;
    content: ReactNode;
};

export default function Dashboard() {
    const [modal, setModal] = useState<ModalState | null>(null);
    const [talonarios, setTalonarios] = useState(getTalonarios);

    const actualizarTalonarios = useCallback(() => {
        setTalonarios(getTalonarios());
    }, []);

    const { abrirModalBackup } = useBackupDashboard({
        setModal: setModal as React.Dispatch<
            React.SetStateAction<BackupDashboardModalState | null>
        >,
        actualizarTalonarios,
    });

    useFocusEffect(
        useCallback(() => {
            actualizarTalonarios();
        }, [actualizarTalonarios])
    );

    function abrirModalTalonario(talonario: Talonario | null = null) {
        setModal({
            title: talonario ? 'Editar talonario' : 'Crear talonario',
            content: (
                <CreateTalonarioForm
                    talonario={talonario}
                    onSubmit={(data) => {
                        try {
                            if (talonario) {
                                updateTalonario(talonario.id, data);
                                alert.success('Talonario actualizado', 100);
                            } else {
                                createTalonario(data);
                                alert.success('Talonario creado', 100);
                            }

                            actualizarTalonarios();
                            setModal(null);
                        } catch (error) {
                            alert.error(
                                error instanceof Error
                                    ? error.message
                                    : 'No se pudo guardar el talonario.'
                            );
                        }
                    }}
                />
            ),
        });
    }

    return (
        <ScrollView
            className="flex-1 bg-[#171A1F] px-6 pt-16"
            keyboardShouldPersistTaps="always"
        >
            <Text className="text-3xl font-bold text-white">
                Hola 👋
            </Text>

            <Text className="mt-2 text-base text-gray-400">
                Administra tus rifas
            </Text>

            <Pressable
                className="mt-3 flex-row items-center justify-center rounded-2xl border border-[#4F7CFF]/40 bg-[#192744] py-4"
                onPress={abrirModalBackup}
            >
                <CloudUpload size={20} color="#64D8FF" />
                <Text className="ml-2 text-base font-bold text-[#64D8FF]">
                    Copia de seguridad
                </Text>
            </Pressable>

            <Pressable
                className="mt-8 flex-row items-center justify-center rounded-2xl bg-[#4F7CFF] py-4"
                onPress={() => abrirModalTalonario()}
            >
                <Plus size={20} color="white" />
                <Text className="ml-2 text-base font-bold text-white">
                    Crear talonario
                </Text>
            </Pressable>

            <Text className="mt-10 text-xl font-bold text-white">
                Mis rifas
            </Text>

            <TalonarioList
                talonarios={talonarios}
                onTalonarioPress={abrirModalTalonario}
            />

            <AppModal
                visible={modal !== null}
                title={modal?.title ?? ''}
                onClose={() => setModal(null)}
            >
                {modal?.content}
            </AppModal>
        </ScrollView>
    );
}

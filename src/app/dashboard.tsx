
import { Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View, ScrollView } from 'react-native';
import CreateTalonarioForm from '@/components/forms/CreateTalonarioForm';
import TalonarioList from "../components/list/talonarioList";
import AppModal from '@/components/ui/AppModal';
import {
    createTalonario,
    updateTalonario,
    getTalonarios,
} from '@/features/talonarios/services/talonariosService';

import type { Talonario } from "../types/talonario";
import { alert } from '@/utils/alert';

export default function Dashboard() {
    const [modalVisible, setModalVisible] = useState(false);
    const [talonarios, setTalonarios] = useState(getTalonarios());
    const [talonarioSeleccionado, setTalonarioSeleccionado] = useState<Talonario | null>(null);
  return (
    <ScrollView className="flex-1 bg-[#171A1F] px-6 pt-16" keyboardShouldPersistTaps="always">
      <Text className="text-3xl font-bold text-white">
        Hola 👋
      </Text>

      <Text className="mt-2 text-base text-gray-400">
        Administra tus rifas
      </Text>

        <Pressable className="mt-8 flex-row items-center justify-center rounded-2xl bg-[#4F7CFF] py-4"
        onPress={() => {
            setTalonarioSeleccionado(null);
            setModalVisible(true);
        }}>
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
            onTalonarioPress={(talonario) => {
                setTalonarioSeleccionado(talonario);
                setModalVisible(true);
            }}
        />

        <AppModal
            visible={modalVisible}
            title={talonarioSeleccionado ? "Editar talonario" : "Crear talonario"}
            onClose={() => setModalVisible(false)}
            >
            <CreateTalonarioForm
                talonario={talonarioSeleccionado}
                onSubmit={(data) => {
                if (talonarioSeleccionado) {
                    updateTalonario(talonarioSeleccionado.id, data);
                    alert.success('Talonario actualizado',100)
                } else {
                    createTalonario(data);
                    alert.success('Talonario creado',100);
                }

                setTalonarios(getTalonarios());
                setModalVisible(false);
            }}
            />
        </AppModal>
    </ScrollView>
  );
}
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@expo/ui/community/datetime-picker';
import { talonarioSchema } from '@/schemas/talonarioSchema';
import { validateForm } from '@/utils/validation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Keyboard } from 'react-native';

import type { Talonario } from "../../types/talonario";
import type { TalonarioInput } from '@/schemas/talonarioSchema';
import { alert } from '@/utils/alert';

type CreateTalonarioFormProps = {
  talonario: Talonario | null;
  onSubmit: (data: TalonarioInput) => void;
};

export default function CreateTalonarioForm({
  onSubmit,
  talonario,
}: CreateTalonarioFormProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {
  control,
  handleSubmit,
  reset,
  setValue,
  watch,
  formState: { errors },
} = useForm<TalonarioInput>({
  resolver: zodResolver(talonarioSchema),
  defaultValues : {
    nombre : '',
    precio : 0,
    cantidad : 0,
    fecha : '',
  }
});
  const fecha = watch('fecha');

  useEffect(() => {
  if (talonario) {
    reset({
      nombre: talonario.nombre,
      precio: talonario.precio,
      cantidad: talonario.cantidad_numeros,
      fecha: talonario.fecha,
    });
  }
}, [talonario, reset]);

  return (
  <View>
    <View>
      <Text className="mb-2 text-sm font-medium text-gray-300">
        Nombre
      </Text>

      <Controller
        control={control}
        name="nombre"
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Ej. Rifa de Navidad"
            placeholderTextColor="#6B7280"
            className={`rounded-xl px-4 py-4 text-white ${
              errors.nombre
                ? 'border border-red-500 bg-[#171A1F]'
                : 'bg-[#171A1F]'
            }`}
          />
        )}
/>
      {errors.nombre && (
        <Text className="mt-1 text-sm text-red-500">
          {errors.nombre?.message}
        </Text>
      )}
    </View>

    <View className="mt-4">
      <Text className="mb-2 text-sm font-medium text-gray-300">
        Precio
      </Text>

      <Controller
        control={control}
        name="precio"
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value ? String(value) : ''}
            onChangeText={(text) => onChange(Number(text))}
            placeholder="Ej. 10000"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"
            className={`rounded-xl px-4 py-4 text-white ${
              errors.precio
                ? 'border border-red-500 bg-[#171A1F]'
                : 'bg-[#171A1F]'
            }`}
          />
        )}
      />
      {errors.precio && (
        <Text className="mt-1 text-sm text-red-500">
          {errors.precio?.message}
        </Text>
      )}
    </View>

    <View className="mt-4">
      <Text className="mb-2 text-sm font-medium text-gray-300">
        Cantidad de números
      </Text>

      <Controller
        control={control}
        name="cantidad"
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value ? String(value) : ''}
            onChangeText={(text) => onChange(Number(text))}
            placeholder="Ej. 1000"
            placeholderTextColor="#6B7280"
            keyboardType="numeric"
            className={`rounded-xl px-4 py-4 text-white ${
              errors.cantidad
                ? 'border border-red-500 bg-[#171A1F]'
                : 'bg-[#171A1F]'
            }`}
          />
        )}
      />
      {errors.cantidad && (
        <Text className="mt-1 text-sm text-red-500">
          {errors.cantidad?.message}
        </Text>
      )}
    </View>

    <View className="mt-4">
      <Text className="mb-2 text-sm font-medium text-gray-300">
        Fecha
      </Text>

      <Pressable
    onPress={() => setShowDatePicker(true)}
    className={`rounded-xl px-4 py-4 text-white ${
      errors.fecha
        ? 'border border-red-500 bg-[#171A1F]'
        : 'bg-[#171A1F]'
    }`}
    >
        <Text className="text-white">
            {fecha || 'Selecciona una fecha'}
        </Text>
    </Pressable>

        {showDatePicker && (
        <DateTimePicker
            value={new Date()}
            onValueChange={(event, selectedDate) => {
                if (selectedDate) {
                const year = selectedDate.getUTCFullYear();
                const month = String(selectedDate.getUTCMonth() + 1).padStart(2, '0');
                const day = String(selectedDate.getUTCDate()).padStart(2, '0');

                setValue('fecha', `${year}-${month}-${day}`);
                }

                setShowDatePicker(false);
            }}
            mode="date"
            presentation="dialog"
        />
        )}
        {errors.fecha && (
          <Text className="mt-1 text-sm text-red-500">
            {errors.fecha?.message}
          </Text>
        )}
    </View>
    <Pressable
        onPress={() => {
          Keyboard.dismiss();

          handleSubmit((data) => {
            onSubmit(data);
            alert.success('');
            reset();
          })();
        }}
        className="mt-6 rounded-2xl bg-[#4F7CFF] py-4"
      >
        <Text className="text-center font-bold text-white">
            Guardar
        </Text>
    </Pressable>
  </View>
);

}
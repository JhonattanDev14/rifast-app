import { Pressable, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";


import type {  Venta } from "../../types/venta";
import { ventaSchema, type VentaInput } from "@/schemas/ventaSchema";
import { useNumerosAleatorios } from "@/features/ventas/hooks/useNumerosAleatorios";


type CreateVentaFormProps = {
  talonarioId: number;
  venta: Venta | null;
  estados: { id: number; nombre: string }[];
  onSubmit: (data: VentaInput) => boolean;
  disabled: boolean;
};

export default function CreateVentaForm({
  talonarioId,
  onSubmit,
  venta,
  estados,
  disabled = false,
}: CreateVentaFormProps) {
  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VentaInput>({
    resolver: zodResolver(ventaSchema),
    defaultValues: {
      numeros: "",
      comprador: "",
      telefono: "",
      estadoId: 1,
      fecha: ""
    },
  });

  const coloresEstados = [
    "bg-[#4F7CFF]", // azul
    "bg-[#F59E0B]", // naranja
    "bg-[#22C55E]", // verde
  ];

  const [cantidadAleatoria, setCantidadAleatoria] = useState("1");
  const {
    cantidad,
    setCantidad,
    generar,
    error: errorAleatorio,
  } = useNumerosAleatorios(talonarioId, venta?.numeros ?? "");

  useEffect(() => {
    if (venta) {
      reset({
        numeros: venta?.numeros,
        comprador: venta?.comprador,
        telefono: venta?.telefono,
        estadoId: venta?.estado_id,
        fecha: venta?.fecha,
      });
    }
  }, [venta, reset]);
  return (
    <View>  
      
      <View className="mt-2 mb-5 flex-row items-center gap-5">
        <TextInput
          value={cantidad}
          onChangeText={setCantidad}
          keyboardType="number-pad"
          placeholder="Cantidad"
          placeholderTextColor="#6B7280"
          editable={!disabled}
          className="w-40 rounded-xl bg-[#171A1F] px-3 py-4 text-center text-white"
        />

        <Pressable
          disabled={disabled}
          onPress={() => {
            const numeros = generar();

            if (numeros) {
              setValue("numeros", numeros.join("#"));
            }
          }}
          className={`flex-1 rounded-xl py-4 ${
            disabled ? "bg-gray-700" : "bg-[#8B5CF6]"
          }`}
        >
          <Text className="text-center font-semibold text-white">
            Al azar
          </Text>
        </Pressable>
      </View>

      {errorAleatorio && (
        <Text className="mb-2 text-sm text-red-500">
          {errorAleatorio}
        </Text>
      )}


      <Text className="mb-2 text-sm font-medium text-gray-300">
        Números
      </Text>

      <Controller
        control={control}
        name="numeros"
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            editable={!disabled}
            onChangeText={onChange}
            placeholder="Ej. 12#25#48"
            placeholderTextColor="#6B7280"
            keyboardType="numbers-and-punctuation"
            className={`rounded-xl px-4 py-4 text-white ${
              errors.numeros
                ? "border border-red-500 bg-[#171A1F]"
                : "bg-[#171A1F]"
            }`}
          />
        )}
      />

      {errors.numeros && (
        <Text className="mt-1 text-sm text-red-500">
          {errors.numeros.message}
        </Text>
      )}

      <View className="mt-4">
        <Text className="mb-2 text-sm font-medium text-gray-300">
          Nombre del comprador
        </Text>

        <Controller
          control={control}
          name="comprador"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              editable={!disabled}
              onChangeText={onChange}
              placeholder="Ej. Juan Pérez"
              placeholderTextColor="#6B7280"
              className={`rounded-xl px-4 py-4 text-white ${
                errors.comprador
                  ? "border border-red-500 bg-[#171A1F]"
                  : "bg-[#171A1F]"
              }`}
            />
          )}
        />

        {errors.comprador && (
          <Text className="mt-1 text-sm text-red-500">
            {errors.comprador.message}
          </Text>
        )}
      </View>

      <View className="mt-4">
        <Text className="mb-2 text-sm font-medium text-gray-300">
          Teléfono
        </Text>

        <Controller
          control={control}
          name="telefono"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              editable={!disabled}
              onChangeText={onChange}
              placeholder="Ej. 3001234567"
              placeholderTextColor="#6B7280"
              keyboardType="phone-pad"
              className={`rounded-xl px-4 py-4 text-white ${
                errors.telefono
                  ? "border border-red-500 bg-[#171A1F]"
                  : "bg-[#171A1F]"
              }`}
            />
          )}
        />

        {errors.telefono && (
          <Text className="mt-1 text-sm text-red-500">
            {errors.telefono.message}
          </Text>
        )}
      </View>

      <View className="mt-4">
        <Text className="mb-2 text-sm font-medium text-gray-300">
          Estado
        </Text>

        <Controller
          control={control}
          name="estadoId"
          render={({ field: { value, onChange } }) => (
            <View className="flex-row gap-2">
              {estados.map((estado, index) => (
                <Pressable
                  disabled={disabled}
                  key={estado.id}
                  onPress={() => onChange(estado.id)}
                  className={`flex-1 rounded-xl py-3 ${
                    value === estado.id
                      ? coloresEstados[index]
                      : "bg-[#171A1F]"
                  }`}
                >
                  <Text className="text-center text-white">
                    {estado.nombre}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        />
      </View>

      <Pressable
        disabled={disabled}
        onPress={() => {
          handleSubmit((data) => {
            const success = onSubmit(data);

            if (success) {
              reset();
            }
          })();
        }}
        className={`mt-6 rounded-xl py-4 ${
          disabled ? "bg-gray-700" : "bg-[#4F7CFF]"
        }`}
      >
        <Text className="text-center font-semibold text-white">
          {disabled ? "Rifa finalizada" : "Guardar venta"}
        </Text>
      </Pressable>
    </View>
  );
}
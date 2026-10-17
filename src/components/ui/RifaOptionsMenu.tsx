import { Pressable, Text, View } from "react-native";
import {
  BarChart3,
  Dices,
  ChevronRight,
  Image,
} from "lucide-react-native";

type Props = {
  onStatsPress: () => void;
  onDrawPress: () => void;
  onShareNumbersPress: () => void;
};

export default function RifaOptionsMenu({
  onStatsPress,
  onDrawPress,
  onShareNumbersPress,
}: Props) {
    return (
        <View className="gap-3">
            
            {/* Compartir números disponibles */}
            <Pressable
            onPress={onShareNumbersPress}
            className="flex-row items-center rounded-2xl border border-[#24583F] bg-[#151922] p-4"
            >
            <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#173A2A]">
                <Image size={22} color="#39FF88" />
            </View>

            <View className="ml-3 flex-1">
                <Text className="text-base font-bold text-white">
                Compartir números
                </Text>

                <Text className="mt-1 text-xs text-gray-500">
                Genera una imagen con los números disponibles
                </Text>
            </View>

            <ChevronRight size={20} color="#6B7280" />
            </Pressable>


            {/* Estadísticas */}
            <Pressable
                onPress={onStatsPress}
                className="flex-row items-center rounded-2xl border border-[#263B70] bg-[#151922] p-4"
            >
                <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#1D2A50]">
                    <BarChart3 size={22} color="#64D8FF" />
                </View>

                <View className="ml-3 flex-1">
                    <Text className="text-base font-bold text-white">
                        Estadísticas
                    </Text>

                    <Text className="mt-1 text-xs text-gray-500">
                        Consulta el estado de tu rifa
                    </Text>
                </View>

                <ChevronRight size={20} color="#6B7280" />
            </Pressable>

            {/* Sorteo */}
            <Pressable
                onPress={onDrawPress}
                className="flex-row items-center rounded-2xl border border-[#263B70] bg-[#151922] p-4"
            >
                <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#30251A]">
                    <Dices size={22} color="#FFD166" />
                </View>

                <View className="ml-3 flex-1">
                    <Text className="text-base font-bold text-white">
                        Sortear ganadores
                    </Text>

                    <Text className="mt-1 text-xs text-gray-500">
                        Realiza el sorteo de la rifa
                    </Text>
                </View>

                <ChevronRight size={20} color="#6B7280" />
            </Pressable>

        </View>
    );
}
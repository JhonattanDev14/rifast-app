
import { Pressable, Text, View } from 'react-native';
import { ShieldCheck } from 'lucide-react-native';

type GoogleConnectedModalProps = {
    email: string;
    onContinuar: () => void;
};

export default function GoogleConnectedModal({
    email,
    onContinuar,
}: GoogleConnectedModalProps) {
    return (
        <View className="items-center pb-2">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-full border border-[#39FF88]/30 bg-[#163C31]">
                <ShieldCheck size={42} color="#39FF88" />
            </View>

            <Text className="text-center text-base font-semibold text-white">
                Tu cuenta está conectada correctamente.
            </Text>

            <Text className="mt-2 text-center text-sm text-gray-300">
                {email}
            </Text>

            <Pressable
                onPress={onContinuar}
                className="mt-5 w-full items-center rounded-xl bg-[#344FE0] p-4"
            >
                <Text className="font-bold text-white">
                    Continuar
                </Text>
            </Pressable>
        </View>
    );
}

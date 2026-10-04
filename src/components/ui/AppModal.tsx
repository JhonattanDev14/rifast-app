import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

type AppModalProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function AppModal({
  visible,
  title,
  onClose,
  children,
}: AppModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/60 px-6"
        onPress={onClose}
      >
        <Pressable
          className="w-full rounded-3xl bg-[#1E2229] p-6"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-white">
              {title}
            </Text>

            <Pressable onPress={onClose}>
              <Text className="text-2xl text-gray-400">×</Text>
            </Pressable>
          </View>

          <ScrollView
            className="mt-6"
            keyboardShouldPersistTaps="always"
          >
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
      <Toast />
    </Modal>
  );
}
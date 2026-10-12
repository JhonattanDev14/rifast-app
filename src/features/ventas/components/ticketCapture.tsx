import { useRef } from "react";
import * as Sharing from "expo-sharing";
import TicketImage from "./ticketImage";
import { Pressable, Text, View } from "react-native";
import ViewShot, { type ViewShotRef } from "react-native-view-shot";

type TicketCaptureProps = {
  ticket: {
    comprador: string;
    telefono: string;
    numeros: number[];
    estado: string;
    fecha: string;
    precio: number;
  };
};

export default function TicketCapture({ ticket }: TicketCaptureProps) {
  const captureRef = useRef<ViewShotRef>(null);

  const compartir = async () => {
    try {
      const uri = await captureRef.current?.capture?.();

      if (!uri) throw new Error("No se pudo generar la imagen.");

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "image/png",
          dialogTitle: "Compartir ticket",
          UTI: "public.png",
        });
      }
    } catch (error) {
      console.error("Error al generar el ticket:", error);
    }
  };

  return (
    <View style={{ padding: 16, gap: 16 }}>
        <View style={{ alignItems: "center" }}>
            <ViewShot
                ref={captureRef}
                options={{ format: "png", quality: 1, result: "tmpfile" }}
            >
                <View style={{ alignSelf: "center" }}>
                  <TicketImage {...ticket} />
                </View>
            </ViewShot>
        </View>

      <Pressable
        onPress={compartir}
        style={{
          backgroundColor: "#22C55E",
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
          Compartir imagen
        </Text>
      </Pressable>
    </View>
  );
}
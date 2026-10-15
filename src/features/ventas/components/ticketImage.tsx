
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type TicketImageProps = {
  comprador: string;
  telefono: string;
  numeros: number[];
  estado: string;
  fecha: string;
  precio: number;
};

const formatoCOP = (valor: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);

export default function TicketImage({
  comprador,
  telefono,
  numeros,
  estado,
  fecha,
  precio,
}: TicketImageProps) {
  const total = numeros.length * precio;

  return (
    <View
      style={{
        width: 300,
        backgroundColor: "#171A20",
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#343B48",
      }}
    >
    {/* Encabezado */}
    <LinearGradient
    colors={["#6D4AFF","#2563EB","#06B6D4",]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{
        paddingHorizontal: 16,
        paddingTop: 15,
        paddingBottom: 12,
        alignItems: "center",
    }}
    >
    <Text
        style={{
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "900",
        letterSpacing: 4,
        }}
    >
        RIFAST
    </Text>

    <Text
        style={{
        color: "#D6D9FF",
        fontSize: 9,
        letterSpacing: 2,
        marginTop: 3,
        }}
    >
    COMPROBANTE DE COMPRA
  </Text>
</LinearGradient>

      {/* Comprador */}
      <View style={{ paddingHorizontal: 16, paddingTop: 13 }}>
        <Text
          style={{
            color: "#7D899B",
            fontSize: 9,
            fontWeight: "700",
            letterSpacing: 1.2,
          }}
        >
          COMPRADOR
        </Text>

        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "700",
            marginTop: 4,
          }}
        >
          {comprador}
        </Text>

        <Text
          style={{
            color: "#AAB4C3",
            fontSize: 11,
            marginTop: 3,
          }}
        >
          {telefono}
        </Text>
      </View>

      {/* Separador */}
      <View
        style={{
          marginHorizontal: 16,
          marginTop: 13,
          borderTopWidth: 1,
          borderColor: "#343B48",
          borderStyle: "dashed",
        }}
      />

      {/* Números */}
      <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <Text
          style={{
            color: "#7D899B",
            fontSize: 9,
            fontWeight: "700",
            letterSpacing: 1.2,
          }}
        >
          TUS NÚMEROS
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 9,
          }}
        >
          {numeros.map((numero, index) => (
            <View
              key={`${numero}-${index}`}
              style={{
                minWidth: 35,
                paddingHorizontal: 8,
                paddingVertical: 7,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#26364B",
                borderWidth: 1,
                borderColor: "#3C638D",
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  color: "#64D8FF",
                  fontSize: 13,
                  fontWeight: "800",
                }}
              >
                {numero}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Resumen de pago */}
      <View
        style={{
          marginTop: 14,
          marginHorizontal: 16,
          paddingTop: 10,
          borderTopWidth: 1,
          borderColor: "#343B48",
          gap: 7,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#AAB4C3", fontSize: 11 }}>
            Valor por número
          </Text>

          <Text style={{ color: "#E1E7EF", fontSize: 11 }}>
            {formatoCOP(precio)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#AAB4C3", fontSize: 11 }}>
            Cantidad
          </Text>

          <Text style={{ color: "#E1E7EF", fontSize: 11 }}>
            {numeros.length}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 3,
            padding: 10,
            backgroundColor: "#202C28",
            borderRadius: 7,
          }}
        >
          <Text
            style={{
              color: "#D5E5DC",
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            TOTAL
          </Text>

          <Text
            style={{
              color: "#39FF88",
              fontSize: 17,
              fontWeight: "900",
            }}
          >
            {formatoCOP(total)}
          </Text>
        </View>
      </View>

      {/* Fecha y estado */}
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "#7D899B",
              fontSize: 9,
              fontWeight: "700",
            }}
          >
            FECHA DEL SORTEO
          </Text>

          <Text
            style={{
              color: "#E1E7EF",
              fontSize: 10,
              marginTop: 4,
            }}
          >
            {fecha
              ? new Date(fecha).toLocaleDateString("es-CO", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: "UTC",
                })
              : "Sin fecha"}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#20372D",
            paddingHorizontal: 9,
            paddingVertical: 6,
            borderRadius: 6,
            maxWidth: 130,
          }}
        >
          <Text
            style={{
              color: "#39FF88",
              fontSize: 10,
              fontWeight: "800",
            }}
          >
            {estado.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Pie */}
      <View
        style={{
          marginTop: 13,
          paddingHorizontal: 12,
          paddingVertical: 10,
          alignItems: "center",
          backgroundColor: "#111419",
        }}
      >
        <Text
          style={{
            color: "#D0D7E2",
            fontSize: 10,
            fontWeight: "700",
          }}
        >
          ¡Gracias por participar!
        </Text>

        <Text
          style={{
            color: "#737E8E",
            fontSize: 9,
            marginTop: 3,
          }}
        >
          Conserva este comprobante
        </Text>
      </View>
    </View>
  );
}

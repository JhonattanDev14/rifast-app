import { Pressable, ScrollView, Text, View } from "react-native";

type Column<T> = {
    key: keyof T;
    label: string;
};

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    onRowPress?: (row: T) => void;
};

const getStatusStyle = (value: string) => {
    switch (value) {
        case "Apartado":
            return {
                bg: "#172554",
                text: "#60A5FA",
                dot: "#3B82F6",
            };
        case "Revisando":
            return {
                bg: "#422006",
                text: "#FBBF24",
                dot: "#F59E0B",
            };
        case "Validado":
            return {
                bg: "#052E1A",
                text: "#4ADE80",
                dot: "#22C55E",
            };
        default:
            return {
                bg: "#1F2937",
                text: "#9CA3AF",
                dot: "#6B7280",
            };
    }
};

export default function DataTable<T>({
    columns,
    data,
    onRowPress,
}: DataTableProps<T>) {
    const columnWidths = columns.map((column) => {
        const headerLength = String(column.label).length;

        const contentLength = data.reduce((max, row) => {
            const value = String(row[column.key] ?? "");
            return Math.max(max, value.length);
        }, 0);

        const length = Math.max(headerLength, contentLength);

        return Math.min(Math.max(length * 8 + 32, 110), 250);
    });

   return (
    <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
    >
        <View className="overflow-hidden rounded-2xl border border-[#252A33] bg-[#0F1319]">

            {/* Header */}
            <View className="flex-row border-b border-[#252A33] bg-[#171C24] py-4">
                {columns.map((column, index) => (
                    <Text
                        key={String(column.key)}
                        style={{ width: columnWidths[index] }}
                        className="px-4 text-xs font-bold uppercase tracking-wider text-[#8B93A1]"
                    >
                        {column.label}
                    </Text>
                ))}
            </View>

            {/* Rows */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
            >
                {data.map((row, index) => (
                    <Pressable
                        key={index}
                        onPress={() => onRowPress?.(row)}
                        className="flex-row items-center border-b border-[#1D222B] py-5 active:bg-[#171C24]"
                    >
                        {columns.map((column, columnIndex) => {
                            const value = String(row[column.key] ?? "");

                            if (column.key === "estado") {
                                const status = getStatusStyle(value);

                                return (
                                    <View
                                        key={String(column.key)}
                                        style={{
                                            width: columnWidths[columnIndex],
                                        }}
                                        className="px-4"
                                    >
                                        <View
                                            style={{
                                                backgroundColor: status.bg,
                                            }}
                                            className="flex-row self-start items-center rounded-full px-3 py-1.5"
                                        >
                                            <View
                                                style={{
                                                    backgroundColor: status.dot,
                                                }}
                                                className="mr-2 h-2 w-2 rounded-full"
                                            />

                                            <Text
                                                style={{
                                                    color: status.text,
                                                }}
                                                className="text-xs font-semibold"
                                            >
                                                {value}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            }

                            return (
                                <Text
                                    key={String(column.key)}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={{
                                        width: columnWidths[columnIndex],
                                    }}
                                    className="px-4 text-sm text-[#D1D5DB]"
                                >
                                    {value}
                                </Text>
                            );
                        })}
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    </ScrollView>
);
}
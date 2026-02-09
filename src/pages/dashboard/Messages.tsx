import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockConversations, mockMessages } from "@/data/mockMessages";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function Messages() {
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState("");

    const selectedMessages = selectedConversation
        ? mockMessages[selectedConversation] || []
        : [];

    const selectedConv = mockConversations.find(c => c.id === selectedConversation);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        alert(`Mensaje enviado: "${newMessage}" (Simulado)`);
        setNewMessage("");
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "biologist":
                return "bg-blue-100 text-blue-700";
            case "institution":
                return "bg-purple-100 text-purple-700";
            case "admin":
                return "bg-orange-100 text-orange-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    if (selectedConversation) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedConversation(null)}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarFallback className={getRoleColor(selectedConv?.participantRole || "")}>
                                {selectedConv?.participantName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-semibold">{selectedConv?.participantName}</h2>
                            <p className="text-sm text-muted-foreground capitalize">
                                {selectedConv?.participantRole === "biologist" ? "Biólogo" : selectedConv?.participantRole === "institution" ? "Institución" : "Admin"}
                            </p>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
                            {selectedMessages.map((message) => {
                                const isSent = message.senderId === "current-user";
                                return (
                                    <div
                                        key={message.id}
                                        className={`flex ${isSent ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[70%] rounded-lg p-3 ${isSent
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted"
                                                }`}
                                        >
                                            <p className="text-sm font-medium mb-1">
                                                {message.senderName}
                                            </p>
                                            <p className="text-sm">{message.content}</p>
                                            <p className="text-xs mt-2 opacity-70">
                                                {formatDistanceToNow(new Date(message.timestamp), {
                                                    addSuffix: true,
                                                    locale: es,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex gap-2">
                            <Textarea
                                placeholder="Escribe un mensaje..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="resize-none"
                                rows={3}
                            />
                            <Button onClick={handleSendMessage} className="self-end">
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-serif mb-2">Mensajes</h1>
                <p className="text-muted-foreground">Conversaciones con otros usuarios</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Bandeja de Entrada</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {mockConversations.map((conversation) => (
                            <button
                                key={conversation.id}
                                onClick={() => setSelectedConversation(conversation.id)}
                                className="w-full flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors border"
                            >
                                <Avatar>
                                    <AvatarFallback className={getRoleColor(conversation.participantRole)}>
                                        {conversation.participantName.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 text-left min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-medium truncate">
                                            {conversation.participantName}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatDistanceToNow(new Date(conversation.lastMessageTime), {
                                                addSuffix: true,
                                                locale: es,
                                            })}
                                        </p>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {conversation.lastMessage}
                                    </p>
                                </div>
                                {conversation.unreadCount > 0 && (
                                    <Badge variant="default" className="ml-2">
                                        {conversation.unreadCount}
                                    </Badge>
                                )}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

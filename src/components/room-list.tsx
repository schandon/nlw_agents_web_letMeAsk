import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRooms } from '@/http/use-rooms';
import { dayjs } from '@/lib/dayjs';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export function RoomList() {
  const { data, isLoading } = useRooms();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas Recentes</CardTitle>
        <CardDescription>
          Acesso rápido criado para as salas criadas recentemente
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando Salas...</p>
        )}
        {data?.map((room) => {
          return (
            <Link
              key={room.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
              to={`room/${room.id}`}
            >
              <div className="flex-1 flex flex-col gap-1">
                <h3 className="font-medium ">{room.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge className="" variant="secondary">
                    {dayjs(room.createdAt).toNow()}
                  </Badge>
                  <Badge className="" variant="secondary">
                    {room.questionCount} pergunta(s)
                  </Badge>
                </div>
              </div>
              <span className="flex items-center gap-1 text-sm">
                Entrar <ArrowRight className="size-3" />
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

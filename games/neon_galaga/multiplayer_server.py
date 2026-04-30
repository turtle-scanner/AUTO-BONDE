import asyncio
import json
import websockets

# 연결된 플레이어 관리
PLAYERS = {}

async def broadcast(message):
    """모든 연결된 클라이언트에게 메시지 전송"""
    if PLAYERS:
        await asyncio.wait([ws.send(json.dumps(message)) for ws in PLAYERS.values()])

async def handler(websocket, path):
    """플레이어 연결 핸들러"""
    # 새로운 플레이어 등록
    player_id = str(id(websocket))
    PLAYERS[player_id] = websocket
    print(f"New pilot connected: {player_id}")
    
    try:
        async for message in websocket:
            data = json.loads(message)
            data['id'] = player_id # 메시지에 플레이어 ID 부여
            
            # 받은 데이터를 다른 모든 플레이어에게 중계
            await broadcast(data)
            
    except websockets.exceptions.ConnectionClosed:
        print(f"Pilot disconnected: {player_id}")
    finally:
        # 접속 종료 시 삭제
        del PLAYERS[player_id]
        await broadcast({'type': 'disconnect', 'id': player_id})

if __name__ == "__main__":
    # 서버 실행 (모든 IP에서 접근 가능하도록 0.0.0.0 설정)
    print("Dragonfly Tactical Server starting on port 8080...")
    start_server = websockets.serve(handler, "0.0.0.0", 8080)
    
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()

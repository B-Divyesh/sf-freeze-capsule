#include <stdlib.h>
#include <sys/socket.h>

int connect(int socket_fd, const struct sockaddr *address, socklen_t address_len) {
  (void)socket_fd;
  (void)address;
  (void)address_len;
  abort();
}

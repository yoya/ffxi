#include "stdafx.h"

#include <stdlib.h>
#include <windows.h>
#include <tlhelp32.h>

DWORD GetProcessID(char *name);
DWORD GetModuleAddr(DWORD dwProcessId, char *moduleName);
void printData (unsigned char *data, int size);

// #define PEEK_MAXSIZE 0xfcf30
#define PEEK_MAXSIZE 0x80000
unsigned char buff[PEEK_MAXSIZE];

int main(int argc, char* argv[])
{
	int start, size;
	if (argc != 3) {
			fprintf(stderr, "Usage: %s <start> <size>\n", argv[0]);
			return 1;
	}
	if ((sscanf(argv[1], "%i", &start) != 1) || (sscanf(argv[2], "%i", &size) != 1)) {
			fprintf(stderr, "start or size is invalid as number\n");
			return 1;
	}
	/*
	if (size > PEEK_MAXSIZE) {
		fprintf(stderr, "Error: too large size 0x%x(=%d)\n",
			size, size);
		return 1;
	}
	*/
	DWORD dwProcessId = GetProcessID("pol.exe");
	if(!dwProcessId) {
		fprintf(stderr, "process not found\n");
		return 1;
	}
	DWORD dwModuleAddr = GetModuleAddr(dwProcessId, "FFXiMain.dll");
	if(!dwModuleAddr) {
		fprintf(stderr, "module not found\n");
		return 1;
	}

	HANDLE hProcess = OpenProcess(PROCESS_VM_READ | PROCESS_VM_OPERATION, FALSE, dwProcessId);
	if(!hProcess) {
		fprintf(stderr, "Can't open process\n");
		return 1;
	}
	while(size>0) {
		int fragm_size = size;
		if (size > PEEK_MAXSIZE) {
				fragm_size = PEEK_MAXSIZE;
		}
		BOOL result = ReadProcessMemory(hProcess, (LPVOID)(dwModuleAddr + start), buff, fragm_size/4, NULL);

		if (!result) {
			fprintf(stderr, "Can't read process memory\n");
			return 1;
		}
//		printf("start=0x%x, size=0x%x\n", start, fragm_size);
		printData(buff, fragm_size);
		start += PEEK_MAXSIZE;
		size -=  PEEK_MAXSIZE;
	}

	return 0;
}


void printData (unsigned char *data, int size) {
	for(int i=0; i<size; i++) {
		putchar(data[i]);
	}
}

void printDataHexStr (unsigned char *data, int size) {
	int i;
	char c;
	for(i=0; i<size; i++) {
		printf("%02x ", data[i] & 0xff);
		if ((i%0x10) == 0xf) {
			printf(" ");
			for(int j=i-0xf; j<i; j++) {
				c = data[j];
				if (!isgraph(c)) { c = '.'; }
				printf("%c", c);
			}
			printf("\n");
		}
	}
	if (((i-1)%0x10) != 0) {
		int j;
		int remain = (i-1)%0x10;
		for(j=0; j<0x10-remain; j++) {
			printf("   ");
		}
		printf(" ");
		for(j=0; j<remain; j++) {
			c = data[j+i-1];
			if (!isgraph(c)) { c = '.'; }
			printf("%c", c);
		}
		printf("\n");
	}
}

DWORD GetProcessID(char *name)
{
	DWORD dwProcessId = NULL;

	HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, NULL);

	if(snapshot != (HANDLE)-1)
	{
		PROCESSENTRY32 process = {0};
		process.dwSize = sizeof(PROCESSENTRY32);
		Process32First(snapshot, &process);
		for(UINT i = 0; i < 255; i++)
		{
			if(!strcmp(process.szExeFile, name))
			{ dwProcessId = process.th32ProcessID; break; }
			if(!Process32Next(snapshot, &process)) break;
		}
		CloseHandle(snapshot);
	}
	return dwProcessId;
}

DWORD GetModuleAddr(DWORD dwProcessId, char *moduleName)
{
	if(!dwProcessId) return NULL;

	DWORD dwModuleAddr = NULL;

	HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPMODULE, dwProcessId);

	if(snapshot != (HANDLE)-1)
	{
		MODULEENTRY32 module = {0};
		module.dwSize = sizeof(MODULEENTRY32);
		Module32First(snapshot, &module);
		for(UINT i = 0; i < 255; i++)
		{
			if(!strcmp(module.szModule, moduleName))
			{ dwModuleAddr = (DWORD)module.modBaseAddr; break; }
			if(!Module32Next(snapshot, &module)) break;
		}
		CloseHandle(snapshot);
	}

	return dwModuleAddr;
}

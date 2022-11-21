import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { CadastroService } from './cadastro.service';

describe('CadastroService', () => {
  let service: CadastroService;
  let httpServiceMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CadastroService);
    httpServiceMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('DEVE RETORNAR TODOS OS CADASTROS', ()=>{
    const cadastrosExemplos = [
      { id: 1, usuario: 'teste1', senha: 'senha1' },
      { id: 2, usuario: 'teste2', senha: 'senha2' }
    ];
    service.read().subscribe(cadastros => {
      expect(cadastros.length).toEqual(2) 
      expect(cadastros).toEqual(cadastrosExemplos)})
      const req = httpServiceMock.expectOne(service.baseUrl)
      expect(req.request.method).toBe("GET")
      req.flush(cadastrosExemplos)
  })

  it('DEVE CRIAR UM CADASTRO', () => {
    const cadastroResponse = 
      { id: 1, usuario: 'teste1', senha: 'senha1' };
     
    const cadastroRequest =
      { usuario: 'teste1', senha: 'senha1' };

    service.create(cadastroRequest).subscribe((cadastro) => {
      expect(cadastro.usuario).toEqual(cadastroRequest.usuario);
      expect(cadastro.senha).toEqual(cadastroRequest.senha);
      expect(cadastro.id).toEqual(1);
      
    });
    const req = httpServiceMock.expectOne(service.baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(cadastroResponse);
  });


  it('DEVE DELETAR UM CADASTRO', () => {
    

    service.delete(2).subscribe();
    const req = httpServiceMock.expectOne(service.baseUrl + "/2");
    expect(req.request.method).toBe('DELETE');
    req.flush(2);
  });
  

   it('DEVE ATUALIZAR UM CADASTRO', () => {
     

     const cadastroRequest = { usuario: 'teste1', senha: 'senha1' };

     service.update(1, cadastroRequest).subscribe((cadastro) => {
       expect(cadastro.usuario).toEqual(cadastroRequest.usuario);
       expect(cadastro.senha).toEqual(cadastroRequest.senha);
       
     });
     const req = httpServiceMock.expectOne(service.baseUrl + "/1");
     expect(req.request.method).toBe('PUT');
     req.flush(cadastroRequest);
   });

it('DEVE RETORNAR UM CADASTRO', () => {
  const cadastrosExemplos = [
    { id: 1, usuario: 'teste1', senha: 'senha1' },
    { id: 2, usuario: 'teste2', senha: 'senha2' }
  ];
  service.readById(1).subscribe((cadastro) => {
    expect(cadastro).toEqual(cadastrosExemplos[1]);
  });
  const req = httpServiceMock.expectOne(service.baseUrl + "/1");
  expect(req.request.method).toBe('GET');
  req.flush(cadastrosExemplos[1]);
});
  
});

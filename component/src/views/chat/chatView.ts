import {ElementUtils} from '../../utils/element/elementUtils';
import {Websocket} from '../../utils/HTTP/websocket';
import {ServiceIO} from '../../services/serviceIO';
import {Messages} from './messages/messages';
import {DeepChat} from '../../deepChat';
import {Input} from './input/input';

export class ChatView {
  private static createElements(deepChat: DeepChat, serviceIO: ServiceIO, panel?: HTMLElement) {
    const containerElement = document.createElement('div');
    containerElement.id = 'chat-view';
    // 新建消息的容器列表
    const messages = new Messages(deepChat, serviceIO, panel);
    if (serviceIO.websocket) Websocket.createConnection(serviceIO, messages);
    //创建一个用户的输入
    const userInput = new Input(deepChat, messages, serviceIO, containerElement);
    // 将父容器，消息容器，用户输入容器添加到containerElement中
    ElementUtils.addElements(containerElement, messages.elementRef, userInput.elementRef);
    return containerElement;
  }

  public static render(deepChat: DeepChat, containerRef: HTMLElement, serviceIO: ServiceIO, panel?: HTMLElement) {
    //继续调用，panel是一个HTMLElement，为空
    const containerElement = ChatView.createElements(deepChat, serviceIO, panel);
    //containerRef 本来就没有子元素，所以直接替换
    containerRef.replaceChildren(containerElement);
  }
}

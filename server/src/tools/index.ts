import { currentTimeTool } from "./current-time.tool.js";
import { upsertMemoryTool } from "./upsert-memory.tool.js";
import { weatherTool } from "./weather.tool.js";

export const chatTools = [currentTimeTool, weatherTool, upsertMemoryTool];

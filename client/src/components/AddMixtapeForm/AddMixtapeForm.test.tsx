import AddMixtapeForm from "./AddMixtapeForm";
import { render, screen } from '@test/testConfig';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from "@testing-library/user-event";
import { mockChannel } from "@/test/mocks";
import { Dispatch, SetStateAction } from 'react';
import { ChannelType } from "@/types/Channel";
import { MixTape } from "@/types/MixTape";